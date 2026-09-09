import React, { useMemo } from 'react';
import { Clock, Calendar, Share2, ArrowLeft, ArrowRight, Check, Twitter, Linkedin, MessageCircle, Link2 } from 'lucide-react';
import { navigate } from '../lib/router';
import { articles } from '../data/articles';
import SEO from './SEO';

interface BlogDetailsProps {
  slug: string;
}

export default function BlogDetails({ slug }: BlogDetailsProps) {
  const [copied, setCopied] = React.useState(false);

  const article = useMemo(() => {
    return articles.find(a => a.slug === slug);
  }, [slug]);

  const isGearwear = useMemo(() => {
    if (!article) return false;
    return article.slug.includes('gearwear') || 
      article.slug.includes('activewear') || 
      article.slug.includes('bio-polymer') || 
      article.tags.some(t => t.toLowerCase().includes('activewear') || t.toLowerCase().includes('gearwear'));
  }, [article]);

  const categoryHubPath = isGearwear ? '/gearwear' : '/hosiery';
  const categoryHubLabel = isGearwear ? 'Gearwear' : 'Hosiery';

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(a => a.id !== article.id)
      .slice(0, 2);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAFCFB] flex flex-col items-center justify-center pt-28 px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-[#0B3D3B]">Article Not Found</h2>
        <p className="text-slate-500 font-normal text-sm max-w-sm mt-2">
          The requested technical publication could not be located.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-[#0B3D3B] hover:bg-[#072725] text-white px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
        >
          Return to Portal Home
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'image': [article.coverImage],
    'datePublished': '2026-02-12T08:00:00+08:00',
    'author': [{
      '@type': 'Person',
      'name': article.author.name,
      'jobTitle': article.author.role
    }],
    'publisher': {
      '@type': 'Organization',
      'name': 'Safety Line',
      'logo': {
        '@type': 'ImageObject',
        'url': `${window.location.origin}/logo.png`
      }
    }
  };

  return (
    <div id="blog-details-page" className="bg-[#FAFCFB] min-h-screen pt-20 pb-24 font-sans text-[#1A1A1A]">
      {/* Category-Specific Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white py-3.5 px-4 sm:px-8 border-b border-white/10 shadow-lg shadow-[#0B3D3B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => navigate(categoryHubPath)}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm ${
              isGearwear ? 'bg-[#FF5A36] text-white' : 'bg-[#D9F0EC] text-[#0B3D3B]'
            }`}>
              {isGearwear ? 'G' : 'H'}
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-display font-extrabold text-sm uppercase">
                  <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">
                  {categoryHubLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Portal
            </button>
            <button
              onClick={() => navigate(categoryHubPath)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                isGearwear ? 'bg-[#FF5A36] text-white hover:bg-[#e44e2b]' : 'bg-[#D9F0EC] text-[#0B3D3B] hover:bg-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {categoryHubLabel} Hub</span>
            </button>
          </div>
        </div>
      </header>

      <SEO
        title={`${article.title} | Safety Line`}
        description={article.excerpt}
        image={article.coverImage}
        type="website"
        keywords={article.tags.join(', ')}
        schema={articleSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#0B3D3B] transition-colors cursor-pointer"
          >
            Portal
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(categoryHubPath)}
            className="hover:text-[#0B3D3B] transition-colors cursor-pointer"
          >
            {categoryHubLabel}
          </button>
          <span>/</span>
          <span className="text-[#0B3D3B] font-bold truncate max-w-xs">{article.category}</span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => navigate(categoryHubPath)}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-slate-500 hover:text-[#0B3D3B] uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {categoryHubLabel} Hub</span>
        </button>

        {/* Article Header */}
        <header className="space-y-5">
          <div className="inline-block px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            {article.category}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D3B] tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="block text-sm font-bold text-[#0B3D3B]">{article.author.name}</span>
                <span className="block text-xs text-slate-500 font-normal">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-500 font-mono">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white p-7 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-7">
          <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed italic border-l-4 border-[#FF5A36] pl-4 bg-[#FAFCFB] py-3 rounded-r-lg">
            {article.excerpt}
          </p>

          <div className="prose prose-slate max-w-none space-y-5 text-slate-700 font-normal text-sm sm:text-base leading-relaxed">
            {article.content.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display text-xl sm:text-2xl font-bold text-[#0B3D3B] pt-4 pb-1 border-b border-slate-100">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('```')) {
                const code = trimmed.replace(/```/g, '').trim();
                return (
                  <pre key={idx} className="bg-[#0B3D3B] text-[#D9F0EC] font-mono text-xs p-4 rounded-xl overflow-x-auto">
                    {code}
                  </pre>
                );
              }
              if (trimmed.startsWith('* ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 text-slate-600">
                    {lines.map((l, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: l.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(trimmed)) {
                const lines = trimmed.split('\n');
                return (
                  <ol key={idx} className="space-y-2 list-decimal pl-5 text-slate-600">
                    {lines.map((l, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: l.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              Indexed Topics & Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-[#D9F0EC] text-[#0B3D3B] text-xs px-2.5 py-1 rounded-md font-mono font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#0B3D3B] uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#FF5A36]" />
              Share Article
            </span>

            <div className="flex items-center space-x-2">
              {/* WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${window.location.href}`)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Twitter / X Share */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-[#0B3D3B] hover:text-white transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Copy URL */}
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0B3D3B] text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="font-display text-xl font-bold text-[#0B3D3B]">
              Related Technical Publications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#FF5A36] block">
                      {rel.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-normal line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-100">
                    <span>{rel.readTime}</span>
                    <span className="text-[#0B3D3B] font-bold uppercase tracking-wider group-hover:text-[#FF5A36] inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
