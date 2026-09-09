import { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { navigate } from '../lib/router';
import { articles } from '../data/articles';
import SEO from './SEO';

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [subscribed, setSubscribed] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach(a => cats.add(a.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = q === '' ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': window.location.origin
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog & Technical Articles',
        'item': `${window.location.origin}/blog`
      }
    ]
  };

  return (
    <div id="blog-list-page" className="bg-[#FAFCFB] min-h-screen pt-28 pb-24 font-sans text-[#1A1A1A]">
      <SEO
        title="Apparel Insights & Textile Science Articles | Safety Line"
        description="Read technical guides on compression science, silk & cashmere care routines, and ISO 9001 European manufacturing standards from Safety Line experts."
        keywords="textile science, compression garment recovery, how to care for silk stockings, cashmere washing guide, European textile manufacturing, Safety Line blog"
        schema={breadcrumbsSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Knowledge Base & Technical Guides</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0B3D3B] tracking-tight">
            Textile Science & Care Guides
          </h1>
          <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            Discover in-depth engineering breakdowns, garment preservation protocols, and behind-the-scenes glimpses into our Swiss and Italian manufacturing facilities.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="article-search-input"
              type="text"
              placeholder="Search articles, topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFCFB] border border-slate-200 focus:border-[#0B3D3B] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder:text-slate-400 outline-none transition-colors"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B3D3B] text-white shadow-xs'
                    : 'bg-[#FAFCFB] text-slate-600 hover:bg-slate-100 hover:text-[#0B3D3B] border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article (first if no filter) */}
        {filteredArticles.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(`/blog/${filteredArticles[0].slug}`)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-md transition-all duration-200 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-slate-100">
              <img
                src={filteredArticles[0].coverImage}
                alt={filteredArticles[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3.5 left-3.5 bg-[#FF5A36] text-white px-3 py-1 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider shadow-xs">
                Featured Guide
              </div>
            </div>
            <div className="lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                  <span className="text-[#0B3D3B] font-bold uppercase">{filteredArticles[0].category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {filteredArticles[0].readTime}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors leading-tight">
                  {filteredArticles[0].title}
                </h2>
                <p className="text-slate-600 font-normal text-sm leading-relaxed line-clamp-3">
                  {filteredArticles[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={filteredArticles[0].author.avatar}
                    alt={filteredArticles[0].author.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#0B3D3B]">{filteredArticles[0].author.name}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{filteredArticles[0].publishedAt}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs font-bold text-[#FF5A36] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                onClick={() => navigate(`/blog/${art.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#FF5A36] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B3D3B] text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-xs">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {art.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#0B3D3B] group-hover:text-[#FF5A36] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-slate-600 font-normal text-xs leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {art.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-[#0B3D3B] bg-[#D9F0EC] px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs text-slate-700 font-medium">{art.author.name}</span>
                  </div>

                  <span className="text-[11px] font-bold text-[#FF5A36] uppercase tracking-wider inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-display text-lg font-bold text-[#0B3D3B]">No articles matched your query</h3>
            <p className="text-slate-500 font-normal text-sm max-w-sm mx-auto">
              Try searching with different terms or selecting a broader category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-[#0B3D3B] hover:bg-[#072725] text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter Section inside Blog */}
        <div className="bg-[#0B3D3B] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-white/10">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D9F0EC]/15 text-[#D9F0EC] text-xs font-mono font-bold uppercase tracking-wider border border-[#D9F0EC]/20">
              <span>The Safety Line Bulletin</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Receive Technical Bulletins & Catalogue Updates
            </h2>
            <p className="text-white/80 font-normal text-xs sm:text-sm leading-relaxed">
              Subscribe to receive technical whitepapers on compression fabric advances, seasonal swatch releases, and athletic garment longevity guidelines.
            </p>
            
            {subscribed ? (
              <div className="bg-[#D9F0EC] text-[#0B3D3B] font-bold text-xs px-4 py-3 rounded-lg max-w-md mx-auto">
                ✓ Thank you for subscribing to the Safety Line technical bulletin.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter work email..."
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-white/60 outline-none focus:border-[#FF5A36] flex-grow"
                />
                <button
                  type="submit"
                  className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
