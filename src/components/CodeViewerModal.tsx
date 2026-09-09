import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, Copy, Check, Search, FileCode, Folder, Terminal, Download, 
  ExternalLink, ChevronRight, Maximize2, Minimize2, Sparkles, RefreshCw
} from 'lucide-react';

interface FileEntry {
  path: string;
  name: string;
  category: string;
  size: number;
}

interface FileDetail {
  path: string;
  name: string;
  language: string;
  size: number;
  lineCount: number;
  content: string;
}

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilePath?: string;
}

// Fallback core files in case API is temporarily unavailable
const FALLBACK_FILES: Record<string, string> = {
  'src/App.tsx': `// Core App routing & state persistence\n// Safety Line Digital Catalogue`,
  'server.ts': `// Full-stack Express server with dynamic API and Vite middleware`,
  'package.json': `// Project configuration & dependencies`,
};

export default function CodeViewerModal({
  isOpen,
  onClose,
  initialFilePath = 'src/App.tsx'
}: CodeViewerModalProps) {
  const [fileList, setFileList] = useState<FileEntry[]>([]);
  const [activePath, setActivePath] = useState<string>(initialFilePath);
  const [fileDetail, setFileDetail] = useState<FileDetail | null>(null);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [openTabs, setOpenTabs] = useState<string[]>([initialFilePath]);

  // Load tree on mount / open
  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/code/tree')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFileList(data);
        } else {
          // Defaults if empty
          setFileList([
            { path: 'src/App.tsx', name: 'App.tsx', category: 'Application Code', size: 6000 },
            { path: 'src/components/PortalLanding.tsx', name: 'PortalLanding.tsx', category: 'Components', size: 18000 },
            { path: 'src/components/CategoryHub.tsx', name: 'CategoryHub.tsx', category: 'Components', size: 60000 },
            { path: 'src/components/ProductDetails.tsx', name: 'ProductDetails.tsx', category: 'Components', size: 45000 },
            { path: 'src/components/ListingModal.tsx', name: 'ListingModal.tsx', category: 'Components', size: 15000 },
            { path: 'server.ts', name: 'server.ts', category: 'Config & Server', size: 21000 },
            { path: 'package.json', name: 'package.json', category: 'Config & Server', size: 950 },
          ]);
        }
      })
      .catch(() => {
        // Fallback file list
        setFileList([
          { path: 'src/App.tsx', name: 'App.tsx', category: 'Application Code', size: 6000 },
          { path: 'server.ts', name: 'server.ts', category: 'Config & Server', size: 21000 },
          { path: 'package.json', name: 'package.json', category: 'Config & Server', size: 950 },
        ]);
      });
  }, [isOpen]);

  // Load specific file content
  const loadFileContent = async (targetPath: string) => {
    setLoadingFile(true);
    setCopied(false);
    try {
      const res = await fetch(`/api/code/file?path=${encodeURIComponent(targetPath)}`);
      if (res.ok) {
        const data = await res.json();
        setFileDetail(data);
      } else {
        // Fallback preview
        const content = FALLBACK_FILES[targetPath] || `// Previewing ${targetPath}\n// File rendered directly in preview mode.`;
        setFileDetail({
          path: targetPath,
          name: targetPath.split('/').pop() || targetPath,
          language: targetPath.endsWith('.json') ? 'json' : 'typescript',
          size: content.length,
          lineCount: content.split('\n').length,
          content,
        });
      }
    } catch (err) {
      setFileDetail({
        path: targetPath,
        name: targetPath.split('/').pop() || targetPath,
        language: 'typescript',
        size: 0,
        lineCount: 1,
        content: `// Error loading live file: ${String(err)}\n// Displaying cached preview for ${targetPath}`,
      });
    } finally {
      setLoadingFile(false);
    }
  };

  useEffect(() => {
    if (isOpen && activePath) {
      loadFileContent(activePath);
    }
  }, [isOpen, activePath]);

  // Handle Tab Switch
  const handleSelectFile = (p: string) => {
    setActivePath(p);
    if (!openTabs.includes(p)) {
      setOpenTabs(prev => [...prev, p]);
    }
  };

  const handleCloseTab = (p: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openTabs.filter(t => t !== p);
    setOpenTabs(remaining);
    if (activePath === p && remaining.length > 0) {
      setActivePath(remaining[remaining.length - 1]);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (!fileDetail) return;
    navigator.clipboard.writeText(fileDetail.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download file
  const handleDownload = () => {
    if (!fileDetail) return;
    const blob = new Blob([fileDetail.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileDetail.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filtered files
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return fileList;
    const q = searchQuery.toLowerCase();
    return fileList.filter(f => f.path.toLowerCase().includes(q) || f.name.toLowerCase().includes(q));
  }, [fileList, searchQuery]);

  // Group files by category
  const groupedFiles = useMemo(() => {
    const map: Record<string, FileEntry[]> = {};
    filteredFiles.forEach(f => {
      const cat = f.category || 'Other';
      if (!map[cat]) map[cat] = [];
      map[cat].push(f);
    });
    return map;
  }, [filteredFiles]);

  if (!isOpen) return null;

  return (
    <div 
      id="code-viewer-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200"
    >
      <div 
        id="code-viewer-window"
        className={`bg-[#1E1E1E] text-slate-100 rounded-2xl shadow-2xl border border-slate-700/60 flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full max-w-6xl h-[88vh] max-h-[900px]'
        }`}
      >
        {/* Top Header */}
        <div className="bg-[#181818] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
            </div>
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-700/60">
              <Terminal className="w-4 h-4 text-[#FF5A36]" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                Safety Line Code Inspector
              </h2>
              <span className="text-[10px] font-mono bg-[#0B3D3B] text-[#D9F0EC] px-2 py-0.5 rounded-md font-semibold hidden sm:inline-block">
                Live Preview View
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Info notice pill */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
              <Sparkles className="w-3 h-3 text-[#FFBD2E]" />
              <span>Full codebase directly accessible</span>
            </div>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-rose-500/20 hover:text-rose-400 transition-colors cursor-pointer"
              title="Close Code Viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Workspace Body: Sidebar + Editor */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-64 sm:w-72 bg-[#141414] border-r border-slate-800/80 flex flex-col shrink-0">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-slate-700/70 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono outline-none focus:border-[#FF5A36]"
                />
              </div>
            </div>

            {/* File List / Explorer */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3 font-mono text-xs">
              {Object.keys(groupedFiles).length === 0 ? (
                <div className="p-4 text-center text-slate-500">No matching files</div>
              ) : (
                (Object.entries(groupedFiles) as [string, FileEntry[]][]).map(([category, files]) => (
                  <div key={category} className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 flex items-center gap-1">
                      <Folder className="w-3 h-3 text-[#FF5A36]/80" />
                      <span>{category}</span>
                    </div>
                    <div className="space-y-0.5">
                      {files.map(file => {
                        const isSelected = activePath === file.path;
                        return (
                          <button
                            key={file.path}
                            onClick={() => handleSelectFile(file.path)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#0B3D3B] text-white font-bold'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#FF5A36]' : 'text-slate-500'}`} />
                              <span className="truncate">{file.name}</span>
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono ml-2 shrink-0">
                              {(file.size / 1024).toFixed(1)}k
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Helpful platform tip */}
            <div className="p-3 border-t border-slate-800/80 bg-[#181818]/60 text-[11px] font-mono text-slate-400">
              <p className="leading-snug">
                <strong className="text-slate-300">Pro tip:</strong> You can also toggle between Code and Preview using the top controls in Google AI Studio.
              </p>
            </div>
          </div>

          {/* Code Content Area */}
          <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden">
            {/* Tabs & Actions Bar */}
            <div className="bg-[#181818] border-b border-slate-800/80 flex items-center justify-between px-2 overflow-x-auto">
              {/* Tab Pills */}
              <div className="flex items-center space-x-1 overflow-x-auto py-1">
                {openTabs.map(tabPath => {
                  const isActive = activePath === tabPath;
                  const tabName = tabPath.split('/').pop() || tabPath;
                  return (
                    <div
                      key={tabPath}
                      onClick={() => setActivePath(tabPath)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-t-md border-t-2 cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-[#1E1E1E] text-white border-[#FF5A36] font-bold'
                          : 'bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
                      }`}
                    >
                      <FileCode className="w-3 h-3 text-[#FF5A36]" />
                      <span className="truncate max-w-[140px]">{tabName}</span>
                      {openTabs.length > 1 && (
                        <button
                          onClick={(e) => handleCloseTab(tabPath, e)}
                          className="text-slate-500 hover:text-white p-0.5 rounded cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: Copy, Download */}
              <div className="flex items-center space-x-1 py-1 pl-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer"
                  title="Copy Full Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  onClick={() => loadFileContent(activePath)}
                  className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded cursor-pointer"
                  title="Reload File"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* File Path & Stats Breadcrumb */}
            <div className="bg-[#1A1A1A] border-b border-slate-800/60 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-1 truncate">
                <span className="text-[#FF5A36] font-bold">path:</span>
                <span className="text-slate-300 truncate">{fileDetail?.path || activePath}</span>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <span>{fileDetail?.lineCount || 0} lines</span>
                <span>•</span>
                <span>{fileDetail?.size ? (fileDetail.size / 1024).toFixed(1) + ' KB' : '0 KB'}</span>
                <span>•</span>
                <span className="uppercase text-emerald-400">{fileDetail?.language || 'typescript'}</span>
              </div>
            </div>

            {/* Code Content with Line Numbers */}
            <div className="flex-1 overflow-auto bg-[#1E1E1E] text-slate-200 font-mono text-xs select-text">
              {loadingFile ? (
                <div className="p-8 flex items-center justify-center text-slate-500 gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FF5A36]" />
                  <span>Loading source code...</span>
                </div>
              ) : !fileDetail?.content ? (
                <div className="p-8 text-center text-slate-500">No content available.</div>
              ) : (
                <div className="flex min-w-full">
                  {/* Line Numbers Gutter */}
                  <div className="py-4 pl-3 pr-3 text-right bg-[#181818] text-slate-600 select-none border-r border-slate-800 shrink-0">
                    {fileDetail.content.split('\n').map((_, index) => (
                      <div key={index} className="leading-5 text-[11px]">
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code Text */}
                  <div className="py-4 px-4 overflow-x-auto flex-1">
                    <pre className="m-0 leading-5 text-[12px] font-mono whitespace-pre">
                      {fileDetail.content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
