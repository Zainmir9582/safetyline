import React, { useMemo } from 'react';
import { Clock, Calendar, Share2, ArrowLeft, ArrowRight, Check, Twitter, Linkedin, MessageCircle, Link2 } from 'lucide-react';
import { navigate } from '../lib/router';
import { articles } from '../data/articles';
import { settings } from '../data';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

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

  const categoryHubPath = isGearwear ? '/gearwear' : '/accessories';
  const categoryHubLabel = isGearwear ? 'Gearwear' : 'Accessories';

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(a => a.id !== article.id)
      .slice(0, 2);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col text-[#141918]">
        <SiteHeader variant="obsidian" />
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-24 text-center">
          <h2 className="font-display text-2xl font-extrabold text-[#141918]">Article Not Found</h2>
          <p className="text-[#525957] text-sm max-w-sm mt-2">
            The requested technical publication could not be located.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 bg-[#0E1A19] hover:bg-[#122B29] text-white px-6 py-3 rounded-sm text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Return to Portal Home
          </button>
        </div>
        <Footer settings={settings} />
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
    <div id="blog-details-page" className="bg-[#F7F6F2] min-h-screen font-sans text-[#141918] flex flex-col">
      <SEO
        title={`${article.title} | Safety Line`}
        description={article.excerpt}
        image={article.coverImage}
        type="website"
        keywords={article.tags.join(', ')}
        schema={articleSchema}
      />

      <SiteHeader variant="obsidian" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-grow w-full">
        {/* Breadcrumb & Back Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2DFD7] pb-4 text-xs font-mono text-[#525957]">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/')} className="hover:text-[#141918] transition-colors cursor-pointer">
              Portal
            </button>
            <span>/</span>
            <button onClick={() => navigate(categoryHubPath)} className="hover:text-[#141918] transition-colors cursor-pointer">
              {categoryHubLabel}
            </button>
            <span>/</span>
            <span className="text-[#141918] font-bold truncate max-w-xs">{article.category}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate(categoryHubPath)}
            className="inline-flex items-center gap-1.5 font-bold text-[#141918] hover:text-[#D92227] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {categoryHubLabel} Hub</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-5">
          <span className="text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-[#D92227] block">
            {article.category}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#141918] tracking-tight leading-[1.08]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E2DFD7]">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E2DFD7]"
              />
              <div>
                <span className="block text-sm font-bold text-[#141918]">{article.author.name}</span>
                <span className="block text-xs text-[#525957]">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-[#525957] font-mono">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </div>
              <span>·</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="aspect-[16/9] w-full rounded-sm overflow-hidden border border-[#E2DFD7] bg-[#ECE9E1]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Editorial Body */}
        <div className="bg-white p-7 sm:p-10 rounded-sm border border-[#E2DFD7] space-y-7">
          <p className="font-serif italic text-lg sm:text-xl text-[#141918] leading-relaxed bg-[#F7F6F2] p-5 border border-[#E2DFD7] rounded-sm">
            &ldquo;{article.excerpt}&rdquo;
          </p>

          <div className="prose prose-slate max-w-none space-y-5 text-[#373E3C] text-sm sm:text-base leading-relaxed">
            {article.content.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-display text-xl sm:text-2xl font-extrabold text-[#141918] pt-4 pb-2 border-b border-[#E2DFD7]">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('```')) {
                const code = trimmed.replace(/```/g, '').trim();
                return (
                  <pre key={idx} className="bg-[#0E1A19] text-white/90 font-mono text-xs p-4 rounded-sm overflow-x-auto">
                    {code}
                  </pre>
                );
              }
              if (trimmed.startsWith('* ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 text-[#525957]">
                    {lines.map((l, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: l.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(trimmed)) {
                const lines = trimmed.split('\n');
                return (
                  <ol key={idx} className="space-y-2 list-decimal pl-5 text-[#525957]">
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

          {/* Indexed Topics */}
          <div className="pt-6 border-t border-[#E2DFD7] space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#525957] block font-semibold">
              Indexed Topics &amp; Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-[#F7F6F2] border border-[#E2DFD7] text-[#141918] text-xs px-2.5 py-1 rounded-sm font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Row */}
          <div className="pt-6 border-t border-[#E2DFD7] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-[#141918] uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#D92227]" />
              Share Article
            </span>

            <div className="flex items-center space-x-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${window.location.href}`)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-sm border border-[#E2DFD7] bg-[#F7F6F2] text-[#141918] hover:border-[#141918] transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-sm border border-[#E2DFD7] bg-[#F7F6F2] text-[#141918] hover:border-[#141918] transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2 rounded-sm border border-[#E2DFD7] bg-[#F7F6F2] text-[#141918] hover:border-[#141918] transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-sm border border-[#E2DFD7] bg-[#F7F6F2] hover:border-[#141918] text-[#141918] text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Link2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 pt-2">
            <h3 className="font-display text-xl font-extrabold text-[#141918]">
              Related Technical Publications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="group cursor-pointer bg-white p-5 rounded-sm border border-[#E2DFD7] hover:border-[#141918] transition-colors flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#D92227] block">
                      {rel.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#141918] group-hover:text-[#D92227] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#525957] line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#525957] font-mono pt-2 border-t border-[#E2DFD7]">
                    <span>{rel.readTime}</span>
                    <span className="text-[#141918] font-bold uppercase tracking-wider group-hover:text-[#D92227] inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer settings={settings} />
    </div>
  );
}
