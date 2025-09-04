import { BlogPost } from '../types/blog';

export interface BlogFAQ {
  question: string;
  answer: string;
  category: string[];
  keywords: string[];
}

export const blogFAQs: BlogFAQ[] = [
  // Investment Strategies FAQs
  {
    question: "What is the best investment strategy for beginners in the UK?",
    answer: "For UK beginners, start with a diversified approach using low-cost index funds within an ISA wrapper. Focus on global equity trackers (like FTSE Global All Cap) and consider a simple portfolio allocation of 80% equities and 20% bonds adjusted for your age and risk tolerance. Begin with regular monthly investments to benefit from pound-cost averaging, and ensure you have 3-6 months of emergency savings before investing.",
    category: ["investment", "financial-education"],
    keywords: ["investment strategy", "beginners", "UK investing", "ISA", "index funds"]
  },
  {
    question: "How much should I invest each month in the UK?",
    answer: "Aim to invest 10-20% of your gross income after maximizing employer pension contributions and building an emergency fund. For 2025, you can invest up to £20,000 annually in ISAs. Start with whatever you can afford - even £25-50 monthly can grow significantly over time through compound returns. Prioritize consistency over amount, and increase contributions with salary rises or bonuses.",
    category: ["investment", "retirement"],
    keywords: ["monthly investing", "investment amount", "ISA allowance", "how much invest"]
  },
  {
    question: "Should I invest in UK stocks or global markets?",
    answer: "Diversification across global markets typically offers better long-term returns and lower risk than concentrating solely in UK stocks. The UK represents only about 4% of global market capitalization. Consider a portfolio with 60-70% global developed markets, 10-20% emerging markets, and 10-20% UK for home bias. Global index funds provide instant diversification and are available through ISAs and SIPPs.",
    category: ["investment", "market-insights"],
    keywords: ["UK vs global investing", "diversification", "global markets", "UK stocks"]
  },
  {
    question: "What's the difference between active and passive investing?",
    answer: "Passive investing tracks market indices through low-cost funds (typically 0.1-0.3% annual fees), while active investing involves fund managers trying to beat the market (often 1-2% annual fees). Research shows 80-90% of active funds underperform their benchmarks over 10+ years. For most UK investors, passive index funds offer better net returns due to lower costs and consistent market exposure.",
    category: ["investment", "financial-education"],
    keywords: ["active vs passive investing", "index funds", "fund management", "investment costs"]
  },
  {
    question: "When should I rebalance my investment portfolio?",
    answer: "Review your portfolio annually or when asset allocation drifts more than 5-10% from targets. For example, if your target is 80% equities but it's grown to 90% due to strong stock performance, consider rebalancing. Use new contributions to buy underweight assets rather than selling winners. Rebalancing within ISAs and pensions avoids tax implications, making these ideal vehicles for portfolio management.",
    category: ["investment", "market-insights"],
    keywords: ["portfolio rebalancing", "asset allocation", "investment management"]
  },
  {
    question: "How do investment platforms compare in the UK?",
    answer: "Top UK platforms include Vanguard (lowest costs for their funds), Interactive Investor (flat fees good for larger portfolios), Hargreaves Lansdown (comprehensive but higher fees), and AJ Bell (competitive for SIPPs). Consider annual fees, dealing charges, fund selection, and platform features. For portfolios under £50,000, percentage-based fees may be cheaper; above £50,000, flat-fee platforms often offer better value.",
    category: ["investment", "financial-education"],
    keywords: ["investment platforms UK", "brokers comparison", "Vanguard", "Hargreaves Lansdown"]
  },

  // Retirement Planning FAQs
  {
    question: "How much do I need for retirement in the UK?",
    answer: "The Pension and Lifetime Savings Association suggests £12,800 annually for minimum retirement, £23,300 for moderate, and £37,300 for comfortable retirement. This typically requires a pension pot of £320,000-£930,000 depending on lifestyle goals. Factor in State Pension (currently £10,600 annually) and consider that you'll likely need 60-80% of your pre-retirement income to maintain your lifestyle.",
    category: ["retirement", "financial-education"],
    keywords: ["retirement planning UK", "pension pot size", "retirement income", "how much need retirement"]
  },
  {
    question: "What's the difference between workplace pensions and SIPPs?",
    answer: "Workplace pensions are employer-provided schemes with automatic contributions and employer matching, making them your first priority. SIPPs (Self-Invested Personal Pensions) offer greater investment control and flexibility, ideal for additional retirement savings or transfers from old workplace schemes. SIPPs allow wider investment choices including individual stocks, while workplace pensions typically offer limited fund selections managed by trustees.",
    category: ["retirement", "tax"],
    keywords: ["workplace pension vs SIPP", "pension types UK", "SIPP benefits"]
  },
  {
    question: "When can I access my pension in the UK?",
    answer: "You can access private pensions from age 55 (rising to 57 in 2028). You can take 25% as a tax-free lump sum, with the remainder subject to income tax. State Pension currently starts at age 66 (rising to 67 by 2028). Accessing pensions early may result in tax penalties and reduced lifetime income. Consider your full retirement strategy including ISAs, which have no age restrictions for withdrawals.",
    category: ["retirement", "tax"],
    keywords: ["pension access age UK", "when can access pension", "state pension age", "pension withdrawal"]
  },
  {
    question: "Should I salary sacrifice into my pension?",
    answer: "Salary sacrifice is usually beneficial as it reduces both income tax and National Insurance contributions. For higher-rate taxpayers, this can save 42% (40% tax + 2% NI). The savings are typically greater than making personal contributions and claiming tax relief later. However, it may reduce your reported salary for mortgage applications or other credit checks, so consider timing carefully.",
    category: ["retirement", "tax"],
    keywords: ["salary sacrifice pension", "pension tax relief", "salary sacrifice benefits"]
  },
  {
    question: "What happens to my pension if I change jobs?",
    answer: "You have several options: leave it with your former employer's scheme, transfer to your new employer's scheme, or move it to a SIPP for greater control. Transfers can take 6-12 weeks and may involve exit fees. Consider the investment options, charges, and any guaranteed benefits before transferring. You can combine multiple old pensions into one SIPP to simplify management and potentially reduce fees.",
    category: ["retirement", "financial-education"],
    keywords: ["pension job change", "pension transfer", "changing jobs pension"]
  },
  {
    question: "How does the State Pension work in the UK?",
    answer: "The full new State Pension is £10,600 annually (2025/26), requiring 35 years of National Insurance contributions. You need at least 10 years to qualify for any State Pension. You can check your forecast at gov.uk and may be able to fill gaps through voluntary contributions. The State Pension increases annually by the triple lock (highest of inflation, wage growth, or 2.5%), providing inflation protection for basic retirement income.",
    category: ["retirement", "financial-education"],
    keywords: ["State Pension UK", "National Insurance", "pension forecast", "State Pension amount"]
  },

  // Tax Optimization FAQs
  {
    question: "How can I reduce my tax bill legally in the UK?",
    answer: "Maximize tax-efficient accounts: £20,000 ISA allowance, pension contributions (annual allowance £60,000), and salary sacrifice schemes. Consider timing of capital gains to use your annual exemption (£6,000 for 2023/24). Married couples can transfer assets to utilize both partners' allowances. For higher earners, pension contributions can reduce the effective tax rate and help avoid losing personal allowance or child benefit.",
    category: ["tax", "financial-education"],
    keywords: ["reduce tax UK", "tax planning", "tax efficient investing", "tax allowances"]
  },
  {
    question: "What's the difference between ISAs and pensions for tax efficiency?",
    answer: "ISAs offer tax-free growth and withdrawal flexibility but no initial tax relief. Pensions provide upfront tax relief (20-45%) but are locked until age 55+ and withdrawals are taxed as income (except 25% tax-free lump sum). For basic-rate taxpayers, ISAs may be better for flexibility. Higher-rate taxpayers often benefit more from pensions' immediate tax relief, especially if they expect lower retirement tax rates.",
    category: ["tax", "retirement"],
    keywords: ["ISA vs pension", "tax efficiency", "pension tax relief", "ISA benefits"]
  },
  {
    question: "How does capital gains tax work on investments?",
    answer: "UK residents pay CGT on gains above the annual exemption (£3,000 for 2024/25, continuing at £3,000 in 2025/26). Rates are 10%/20% for most assets (18%/28% for property), depending on your income tax band. You can reduce CGT by using your annual exemption, transferring assets to spouses, and harvesting losses. ISAs and pensions are exempt from CGT, making them tax-efficient investment vehicles.",
    category: ["tax", "investment"],
    keywords: ["capital gains tax UK", "CGT rates", "tax on investments", "CGT planning"]
  },
  {
    question: "What tax reliefs are available for investors in the UK?",
    answer: "Key reliefs include: ISA tax-free wrapper (£20,000 annually), pension tax relief (up to £60,000), EIS/SEIS for startup investments (30-50% tax relief plus CGT exemption), and VCT investments (30% tax relief). The annual CGT exemption and dividend allowance also provide tax-free investment income. These reliefs can significantly enhance after-tax returns when used strategically.",
    category: ["tax", "investment"],
    keywords: ["UK tax reliefs", "EIS SEIS", "investment tax breaks", "VCT relief"]
  },
  {
    question: "Should I invest in a pension or ISA first?",
    answer: "Prioritize employer pension matching first (free money), then consider your tax situation. Higher-rate taxpayers often benefit from pension contributions for immediate tax relief, while basic-rate taxpayers might prefer ISA flexibility. A balanced approach works well: maximize employer matching, then split additional savings between pensions (for tax relief) and ISAs (for flexibility). Consider your retirement timeline and access needs.",
    category: ["tax", "retirement"],
    keywords: ["pension or ISA first", "pension vs ISA", "retirement savings priority"]
  },
  {
    question: "How can married couples optimize their taxes?",
    answer: "Utilize both partners' allowances: transfer assets to use both CGT exemptions (£6,000 each), ISA allowances (£40,000 combined), and personal allowances. Consider transferring marriage allowance (£1,260 tax saving if one earns under £12,570). For investments, the lower-earning spouse should hold dividend-paying assets to utilize their dividend allowance and basic-rate tax band. Pension contributions can be split to optimize both partners' tax positions.",
    category: ["tax", "estate"],
    keywords: ["married couples tax", "marriage allowance", "spouse tax planning", "joint tax optimization"]
  },

  // Market Insights FAQs
  {
    question: "Should I worry about market volatility when investing?",
    answer: "Market volatility is normal and expected - the UK stock market experiences corrections (10%+ falls) every 1-2 years on average. For long-term investors (10+ years), volatility often creates buying opportunities. Focus on your investment timeline: if you need money within 5 years, consider lower-risk options. Regular investing (pound-cost averaging) can help smooth volatility's impact by buying more shares when prices are low.",
    category: ["market-insights", "investment"],
    keywords: ["market volatility", "investment risk", "market corrections", "long term investing"]
  },
  {
    question: "Is it a good time to invest in the UK stock market?",
    answer: "Time in the market typically beats timing the market. UK stocks have historically delivered positive returns over rolling 10-year periods despite short-term volatility. Rather than waiting for the 'perfect' time, consider regular monthly investing to average out market fluctuations. If you're concerned about current valuations, gradually increase your investment over 6-12 months rather than investing a lump sum immediately.",
    category: ["market-insights", "investment"],
    keywords: ["when to invest", "market timing", "UK stock market", "investment timing"]
  },
  {
    question: "How do global events affect UK investment portfolios?",
    answer: "Global events can cause short-term market movements, but well-diversified portfolios typically recover over time. UK markets are influenced by domestic factors (interest rates, politics) and global trends (trade, commodity prices). Diversification across regions, sectors, and asset classes helps reduce single-market risk. Focus on your long-term goals rather than reacting to daily news, as emotional decisions often harm returns.",
    category: ["market-insights", "investment"],
    keywords: ["global events investing", "market impact", "investment volatility", "UK market factors"]
  },
  {
    question: "What's the outlook for UK property vs stock market investments?",
    answer: "Historically, UK stocks have outperformed property over long periods, with better liquidity and lower transaction costs. Property offers rental income and tangible ownership but requires significant capital, incurs high fees (stamp duty, legal costs), and lacks diversification. REITs provide property exposure with stock market liquidity. For most investors, a diversified equity portfolio offers better long-term wealth building potential than direct property investment.",
    category: ["market-insights", "investment"],
    keywords: ["property vs stocks UK", "real estate investing", "UK property market", "REITs"]
  },
  {
    question: "How do interest rate changes affect my investments?",
    answer: "Rising interest rates typically hurt bond prices and high-dividend stocks but benefit savers and can support currency values. Growth stocks often underperform as future earnings are discounted more heavily. Real estate and utilities sectors are particularly sensitive to rate changes. Diversified portfolios help weather rate cycles, and investors should focus on long-term fundamentals rather than short-term rate movements.",
    category: ["market-insights", "investment"],
    keywords: ["interest rates investing", "rate impact investments", "bond prices", "dividend stocks"]
  },
  {
    question: "Are we in an investment bubble, and should I be concerned?",
    answer: "Bubbles are only clearly identifiable after they burst. While certain sectors may appear overvalued, predicting timing is nearly impossible. Instead of trying to time markets, maintain a diversified portfolio, avoid speculative investments you don't understand, and stick to your long-term plan. If you're concerned about valuations, consider gradually shifting to more defensive assets or increasing cash holdings, but avoid making dramatic portfolio changes based on bubble fears.",
    category: ["market-insights", "investment"],
    keywords: ["investment bubble", "market bubble", "overvalued markets", "bubble investing"]
  },

  // Estate Planning FAQs
  {
    question: "Do I need a will if I don't have many assets?",
    answer: "Yes, everyone over 18 should have a will. Without one, your estate follows intestacy rules which may not reflect your wishes - unmarried partners inherit nothing, and asset distribution follows strict legal hierarchy. A will also lets you appoint guardians for children and executors for your estate. Even modest assets like bank accounts, personal belongings, and digital assets need proper distribution. Basic wills cost £150-300, far less than potential intestacy complications.",
    category: ["estate", "financial-education"],
    keywords: ["need a will", "will importance", "intestacy rules", "will cost UK"]
  },
  {
    question: "How does inheritance tax work in the UK?",
    answer: "IHT is charged at 40% on estates over £325,000 (nil-rate band), plus an additional £175,000 residence nil-rate band if passing your main home to children/grandchildren. Married couples can combine allowances for up to £1 million tax-free threshold. Gifts to spouses, charities, and some trusts are exempt. Annual gifting allowances (£3,000 plus various small gifts) and potentially exempt transfers (gifts surviving 7 years) can reduce IHT liability.",
    category: ["estate", "tax"],
    keywords: ["inheritance tax UK", "IHT rates", "nil rate band", "inheritance planning"]
  },
  {
    question: "What are lasting powers of attorney and why do I need them?",
    answer: "LPAs allow trusted people to make decisions if you lose mental capacity. There are two types: Property & Finance (managing money, property, benefits) and Health & Welfare (medical treatment, care decisions). Without LPAs, family must apply to the Court of Protection, which is expensive, lengthy, and stressful. LPAs cost £82 each to register and should be arranged while you have full capacity - you cannot create them once capacity is lost.",
    category: ["estate", "financial-education"],
    keywords: ["lasting power attorney", "LPA UK", "mental capacity", "power of attorney cost"]
  },
  {
    question: "Should I put assets in trust to avoid inheritance tax?",
    answer: "Trusts can be useful for IHT planning but are complex with ongoing compliance requirements. Simple discretionary trusts pay 20% income tax and face periodic IHT charges. More sophisticated planning like discounted gift schemes or loan trusts may be appropriate for larger estates. The residence nil-rate band reduced trust benefits for many families. Always seek specialist advice as trust taxation is complex and HMRC scrutinizes aggressive arrangements.",
    category: ["estate", "tax"],
    keywords: ["trusts inheritance tax", "trust planning UK", "family trusts", "trust tax"]
  },
  {
    question: "How do I plan for care costs in later life?",
    answer: "Care costs average £30,000-50,000 annually for residential care. Local authorities means-test care funding - those with assets over £23,250 typically pay full costs. Consider: building larger pension pots, utilizing ISAs for flexible access, immediate needs annuities for care funding, and care fee insurance policies. Property wealth may need to fund care unless protected through careful planning. Start planning early as options become limited once care needs arise.",
    category: ["estate", "retirement"],
    keywords: ["care costs UK", "care funding", "care home fees", "long term care planning"]
  },
  {
    question: "What happens to my pensions when I die?",
    answer: "Death benefits depend on pension type and your age. Most defined contribution pensions (workplace schemes, SIPPs) can be passed to beneficiaries tax-free if you die before age 75, or subject to their income tax rate if after 75. The State Pension typically stops on death, though spouses may inherit some benefits. Always complete nomination forms to specify beneficiaries and avoid delays. Some final salary schemes provide spouse/dependant pensions.",
    category: ["estate", "retirement"],
    keywords: ["pension death benefits", "pension inheritance", "pension beneficiaries", "death benefits UK"]
  },

  // Financial Education FAQs
  {
    question: "When should I consider getting a financial adviser?",
    answer: "Consider professional advice when you have complex needs: significant assets (£100,000+), multiple income sources, inheritance planning, business ownership, or approaching retirement. Also valuable when facing major life changes (divorce, inheritance, career change) or if you lack time/knowledge for DIY investing. Ensure any adviser is FCA-regulated, fee-only where possible, and has relevant qualifications (Diploma in Financial Planning or equivalent).",
    category: ["financial-education"],
    keywords: ["when need financial adviser", "financial advice UK", "choosing financial adviser"]
  },
  {
    question: "What qualifications should a good financial adviser have?",
    answer: "Look for FCA authorization (check the FCA register), Level 4 Diploma in Financial Planning (minimum competency standard), and ideally Chartered status (Chartered Financial Planner or Personal Finance Society membership). Specialist areas may require additional qualifications (pension transfers, mortgages). Experience matters - ask about their client profile, areas of expertise, and how they keep up with regulatory changes. Fee-only advisers typically have fewer conflicts of interest than commission-based ones.",
    category: ["financial-education"],
    keywords: ["financial adviser qualifications", "FCA regulation", "chartered financial planner"]
  },
  {
    question: "How much should I pay for financial advice?",
    answer: "Independent financial advice typically costs £150-300 per hour or 0.5-1.5% annually for ongoing portfolio management. Initial financial planning might cost £1,000-3,000 depending on complexity. Fee-only advisers are generally preferred over commission-based ones to avoid conflicts of interest. Some advisers offer fixed-fee arrangements for specific services. Compare the cost against potential benefits - good advice often pays for itself through tax efficiency and better investment returns.",
    category: ["financial-education"],
    keywords: ["financial advice cost", "adviser fees", "fee only adviser", "advice charges"]
  },
  {
    question: "Can I manage my finances myself without an adviser?",
    answer: "Many people successfully manage their own finances using low-cost platforms and index funds. DIY works well if you're comfortable with basic investment principles, have simple needs, and can avoid emotional decisions during market volatility. Use ISAs and workplace pensions, invest in diversified index funds, and focus on keeping costs low. However, complex situations (inheritance, business ownership, retirement planning) often benefit from professional guidance.",
    category: ["financial-education", "investment"],
    keywords: ["DIY investing", "self directed investing", "manage own finances", "investment platforms"]
  },
  {
    question: "What's the difference between fee-only and commission-based advisers?",
    answer: "Fee-only advisers are paid directly by clients and don't receive commissions from product providers, reducing conflicts of interest. Commission-based advisers earn from recommending specific products, which may influence their advice. Fee-only typically costs more upfront but often provides more objective recommendations. Many advisers now operate on a 'fee-based' model, combining both approaches. Always understand how your adviser is compensated and what this means for their recommendations.",
    category: ["financial-education"],
    keywords: ["fee only adviser", "commission based adviser", "adviser compensation", "independent financial advice"]
  },
  {
    question: "How do I know if financial advice is working for me?",
    answer: "Good financial advice should provide: clear written recommendations, regular review meetings, transparent reporting of performance and fees, and progress toward your goals. Your portfolio should be appropriately diversified for your risk level and timeline. Compare your returns to relevant benchmarks (not just positive performance). Most importantly, you should feel more confident about your financial future and have a clear plan for achieving your goals.",
    category: ["financial-education"],
    keywords: ["financial advice value", "adviser performance", "investment results", "financial planning success"]
  }
];

// Function to get relevant FAQs based on blog post category and content
export function getRelevantFAQs(post: BlogPost, maxFAQs: number = 6): BlogFAQ[] {
  const postCategory = post.category.id;
  const postTags = post.tags.map(tag => tag.toLowerCase());
  const postContent = (post.title + ' ' + post.excerpt + ' ' + post.content).toLowerCase();
  
  // Score FAQs based on relevance
  const scoredFAQs = blogFAQs.map(faq => {
    let score = 0;
    
    // Category match (highest priority)
    if (faq.category.includes(postCategory)) {
      score += 10;
    }
    
    // Tag matches
    faq.keywords.forEach(keyword => {
      if (postTags.some(tag => tag.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(tag))) {
        score += 5;
      }
    });
    
    // Content keyword matches
    faq.keywords.forEach(keyword => {
      if (postContent.includes(keyword.toLowerCase())) {
        score += 2;
      }
    });
    
    return { faq, score };
  });
  
  // Sort by score and return top matches
  return scoredFAQs
    .sort((a, b) => b.score - a.score)
    .slice(0, maxFAQs)
    .map(item => item.faq);
}