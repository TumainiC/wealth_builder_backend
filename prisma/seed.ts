import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.quizResponse.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.module.deleteMany();
    await prisma.learningPath.deleteMany();

    console.log('Cleared existing data...');

    // ========== LEARNING PATH 1: Starting a Small Business ==========
    const businessPath = await prisma.learningPath.create({
        data: {
            title: 'Starting a Small Business',
            description: 'Learn how to identify opportunities, calculate profits, and grow your customer base through practical Kenyan business examples.',
            level: 'BEGINNER',
        },
    });

    // Module 1: Identifying Opportunities
    await prisma.module.create({
        data: {
            pathId: businessPath.id,
            title: 'Identifying Business Opportunities',
            content: `Starting a business begins with identifying a need in your community. Look around your neighborhood - what products or services are people struggling to find? What problems can you solve?

**The Wholesale-Retail Model:**
One of the most accessible business models in Kenya is buying products wholesale and selling them retail. This works particularly well with everyday items like eggs, vegetables, and household goods.

**Real Example: The Egg Business**
- Buy wholesale: KES 300 per tray (30 eggs)
- Sell retail: KES 12-13 per egg
- Profit per tray: KES 60-90
- If you sell 10 trays per week, that's KES 600-900 weekly profit!

**How to Start:**
1. Identify your product - start with something people buy regularly
2. Find a reliable wholesale supplier
3. Start small - begin with neighbors and friends
4. Build trust through quality and consistency
5. Gradually expand your customer base

**Key Success Factors:**
- Choose products with consistent demand
- Maintain good relationships with suppliers
- Offer excellent customer service
- Keep accurate records of sales and expenses
- Reinvest profits to grow your business`,
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is the first step in starting a business?',
                    options: ['Buying inventory', 'Identifying a need in the market', 'Hiring staff', 'Renting a shop'],
                    correctAnswer: 'Identifying a need in the market',
                },
                {
                    question: 'If you buy eggs at KES 300 per tray and sell each egg at KES 12, what is your profit per tray?',
                    options: ['KES 60', 'KES 90', 'KES 300', 'KES 360'],
                    correctAnswer: 'KES 60',
                },
                {
                    question: 'Which of these is the best way to start your customer base?',
                    options: ['Advertise on TV', 'Start with neighbors and friends', 'Open a large shop immediately', 'Sell only online'],
                    correctAnswer: 'Start with neighbors and friends',
                },
                {
                    question: 'What makes the wholesale-retail model accessible for beginners?',
                    options: ['It requires large capital', 'It works with everyday items people need', 'It needs special training', 'It only works in cities'],
                    correctAnswer: 'It works with everyday items people need',
                },
            ],
        },
    });

    // Module 2: Calculating Profit Margins
    await prisma.module.create({
        data: {
            pathId: businessPath.id,
            title: 'Calculating Profit Margins',
            content: `Understanding profit margins is crucial for business success. Your profit margin tells you how much money you're actually making from each sale.

**Basic Formula:**
Profit = Selling Price - Cost Price
Profit Margin % = (Profit / Selling Price) × 100

**Real Example: Mama Mboga Vegetable Business**
- Buys tomatoes at KES 50 per kg (wholesale)
- Sells at KES 80 per kg (retail)
- Profit per kg = KES 30
- Profit Margin = (30/80) × 100 = 37.5%

**Why Profit Margins Matter:**
1. They help you price products correctly
2. Show which products are most profitable
3. Help you make smart business decisions
4. Indicate if your business is sustainable

**Calculating Monthly Profits:**
Let's say you sell eggs:
- 10 trays per week at KES 70 profit per tray = KES 700/week
- Monthly profit = KES 700 × 4 = KES 2,800
- After expenses (transport KES 400/month) = KES 2,400 net profit

**Tips for Better Margins:**
- Buy in larger quantities for better wholesale prices
- Reduce waste by managing inventory carefully
- Build direct relationships with suppliers
- Focus on high-demand, high-margin products
- Track all expenses accurately`,
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'If you buy an item for KES 100 and sell it for KES 150, what is your profit?',
                    options: ['KES 50', 'KES 100', 'KES 150', 'KES 250'],
                    correctAnswer: 'KES 50',
                },
                {
                    question: 'What is the profit margin percentage if you make KES 20 profit on a KES 100 sale?',
                    options: ['10%', '20%', '25%', '30%'],
                    correctAnswer: '20%',
                },
                {
                    question: 'Why is it important to track all expenses?',
                    options: ['To impress customers', 'To calculate true net profit', 'To pay more taxes', 'It is not important'],
                    correctAnswer: 'To calculate true net profit',
                },
                {
                    question: 'How can you improve your profit margins?',
                    options: ['Sell less products', 'Buy in larger quantities for better prices', 'Increase expenses', 'Ignore supplier relationships'],
                    correctAnswer: 'Buy in larger quantities for better prices',
                },
            ],
        },
    });

    // Module 3: Growing Your Customer Base
    await prisma.module.create({
        data: {
            pathId: businessPath.id,
            title: 'Growing Your Customer Base',
            content: `Once you've started your business, growth comes from expanding your customer base strategically.

**Start Local, Think Big:**
Begin in your immediate area and gradually expand. Word of mouth is powerful in Kenyan communities!

**Proven Growth Strategies:**

**1. Deliver Excellent Service**
- Be reliable - deliver on time, every time
- Maintain product quality consistently
- Be honest about what you can and cannot do
- Build personal relationships with customers

**2. Use Word of Mouth**
- Happy customers tell others
- Ask satisfied customers for referrals
- Offer small incentives for recommendations
- Join local business groups and networks

**3. Leverage M-Pesa and Mobile Money**
- Make it easy for customers to pay
- Offer M-Pesa payment options
- Keep transaction records
- Build trust through digital payments

**4. Expand Gradually**
- Start with your estate/neighborhood
- Move to nearby areas
- Consider supplying to small shops
- Eventually supply to institutions (schools, offices)

**Real Example: Boda Boda Business Growth**
James started with 1 motorcycle:
- Month 1-3: Built reputation in his area
- Month 4-6: Added regular customers (schools, offices)
- Month 7-12: Saved profits and bought 2nd motorcycle
- Year 2: Now runs fleet of 3 motorcycles with hired riders

**Key Lessons:**
- Reinvest profits for growth
- Maintain quality as you scale
- Build systems and processes
- Keep learning and adapting`,
            order: 3,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is the most powerful marketing tool in Kenyan communities?',
                    options: ['TV advertising', 'Word of mouth', 'Social media only', 'Billboards'],
                    correctAnswer: 'Word of mouth',
                },
                {
                    question: 'Why should you offer M-Pesa payment options?',
                    options: ['It is required by law', 'It makes payment easy and builds trust', 'It is more expensive', 'Only for large businesses'],
                    correctAnswer: 'It makes payment easy and builds trust',
                },
                {
                    question: 'What should you do with your business profits?',
                    options: ['Spend all on personal items', 'Reinvest to grow the business', 'Hide the money', 'Give it all away'],
                    correctAnswer: 'Reinvest to grow the business',
                },
                {
                    question: 'How should you expand your business?',
                    options: ['All at once to many areas', 'Gradually from local to wider areas', 'Only stay in one location forever', 'Randomly without planning'],
                    correctAnswer: 'Gradually from local to wider areas',
                },
            ],
        },
    });

    // Module 4: Reinvesting Profits
    await prisma.module.create({
        data: {
            pathId: businessPath.id,
            title: 'Reinvesting Profits for Growth',
            content: `The secret to growing from a small business to a thriving enterprise is smart reinvestment of profits.

**The Reinvestment Principle:**
Don't spend all your profits! Set aside a portion to grow your business. A common rule: Save 50% of profits for business growth, use 50% for personal needs.

**Smart Reinvestment Strategies:**

**1. Increase Inventory**
- Buy more stock to serve more customers
- Take advantage of bulk discounts
- Reduce stockouts and lost sales

**2. Improve Equipment**
- Better tools increase efficiency
- Example: Upgrading from bicycle to motorcycle for deliveries
- Example: Buying a refrigerator for perishable goods

**3. Expand Product Range**
- Add complementary products
- Example: If selling eggs, add bread or milk
- Diversification reduces risk

**4. Build Emergency Fund**
- Set aside 3-6 months of operating expenses
- Protects against unexpected challenges
- Gives peace of mind

**Real Example: Poultry Farm Growth**
Mary started with 50 chickens:
- Month 1-3: Sold eggs, saved 50% of profits (KES 15,000)
- Month 4: Bought 50 more chickens (KES 12,000)
- Month 6: Now has 100 chickens, doubled income
- Month 9: Built better coop (KES 20,000)
- Year 2: Expanded to 200 chickens, hired helper

**Reinvestment vs. Personal Spending:**
- Track business and personal money separately
- Pay yourself a salary from profits
- Reinvest the rest strategically
- Avoid mixing business and personal funds

**Growth Milestones:**
- Start: 1 product, local customers
- 6 months: Multiple products, wider area
- 1 year: Established customer base, steady income
- 2 years: Expanded operations, possibly hired help`,
            order: 4,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is a good rule for dividing business profits?',
                    options: ['Spend 100% on personal needs', 'Save 50% for business, use 50% for personal needs', 'Save everything, spend nothing', 'Give all profits to others'],
                    correctAnswer: 'Save 50% for business, use 50% for personal needs',
                },
                {
                    question: 'Why should you build an emergency fund?',
                    options: ['It is not necessary', 'To protect against unexpected challenges', 'To show off to others', 'Only large businesses need this'],
                    correctAnswer: 'To protect against unexpected challenges',
                },
                {
                    question: 'What is a smart way to reinvest profits?',
                    options: ['Buy luxury items', 'Increase inventory to serve more customers', 'Lend money to friends', 'Hide cash at home'],
                    correctAnswer: 'Increase inventory to serve more customers',
                },
                {
                    question: 'Why should you separate business and personal money?',
                    options: ['It is not important', 'To track business performance accurately', 'To confuse yourself', 'Only for accountants'],
                    correctAnswer: 'To track business performance accurately',
                },
            ],
        },
    });

    console.log('Created Business Path with 4 modules...');

    // ========== LEARNING PATH 2: Investing in Stocks (NSE Basics) ==========
    const stocksPath = await prisma.learningPath.create({
        data: {
            title: 'Investing in Stocks (NSE Basics)',
            description: 'Understand the Nairobi Securities Exchange, how companies make money, and how to buy your first share.',
            level: 'INTERMEDIATE',
        },
    });

    // Module 1: What is the Stock Market?
    await prisma.module.create({
        data: {
            pathId: stocksPath.id,
            title: 'What is the Stock Market?',
            content: `The Nairobi Securities Exchange (NSE) is Kenya's marketplace for buying and selling shares of publicly listed companies. When you buy shares, you become a part-owner of that company!

**How the Stock Market Works:**

Think of the NSE like a market where instead of buying vegetables, you're buying small pieces of companies. These pieces are called "shares" or "stocks."

**Key Terms to Know:**

**Shares/Stocks:** Units of ownership in a company. If Safaricom has 1 million shares and you own 100, you own 0.01% of Safaricom!

**Dividends:** When companies make profits, they sometimes share them with shareholders. This is your reward for investing.

**Capital Gains:** If you buy a share at KES 20 and sell it at KES 30, you've made KES 10 profit. This is a capital gain.

**Stockbroker:** A licensed professional who helps you buy and sell shares. You cannot buy shares directly - you need a broker.

**CDS Account:** Central Depository System account - like a bank account, but for holding your shares electronically.

**Why Invest in Stocks?**

1. **Grow Your Wealth:** Historically, stocks grow faster than savings accounts
2. **Earn Dividends:** Get regular income from profitable companies
3. **Beat Inflation:** Your money grows instead of losing value
4. **Own Quality Companies:** Be part of Kenya's leading businesses

**Companies Listed on NSE:**
- Safaricom (Telecommunications)
- Equity Bank, KCB (Banking)
- EABL (Beverages)
- BAT Kenya (Manufacturing)
- And 60+ more companies across various sectors

**Getting Started:**
You can start investing with as little as KES 1,000! The key is to start small, learn, and grow your knowledge and portfolio over time.`,
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is a share?',
                    options: ['A loan to a company', 'A unit of ownership in a company', 'A type of savings account', 'A government bond'],
                    correctAnswer: 'A unit of ownership in a company',
                },
                {
                    question: 'What are dividends?',
                    options: ['Fees you pay to brokers', 'Profits shared with shareholders', 'Taxes on investments', 'Losses from bad investments'],
                    correctAnswer: 'Profits shared with shareholders',
                },
                {
                    question: 'Can you buy shares directly from the NSE without a broker?',
                    options: ['Yes, anyone can buy directly', 'No, you need a licensed stockbroker', 'Only if you have KES 1 million', 'Only banks can buy shares'],
                    correctAnswer: 'No, you need a licensed stockbroker',
                },
                {
                    question: 'What is the minimum amount you can start investing with?',
                    options: ['KES 1 million', 'KES 100,000', 'KES 1,000', 'KES 10 million'],
                    correctAnswer: 'KES 1,000',
                },
            ],
        },
    });

    // Module 2: How Companies Make Money
    await prisma.module.create({
        data: {
            pathId: stocksPath.id,
            title: 'How Companies Make Money (And You Profit)',
            content: `Understanding how companies make money helps you choose good investments. Let's break it down with Kenyan examples.

**Business Models of NSE Companies:**

**1. Safaricom (Telecommunications)**
- Revenue: Airtime, data, M-Pesa transactions
- Profit: After paying for network infrastructure, staff, etc.
- Shareholders benefit: Dividends + share price growth

**2. Equity Bank (Banking)**
- Revenue: Interest on loans, banking fees
- Profit: Interest earned minus interest paid to depositors
- Shareholders benefit: Regular dividends from banking profits

**3. EABL - East African Breweries (Manufacturing)**
- Revenue: Selling beverages (Tusker, Guinness, etc.)
- Profit: Sales revenue minus production costs
- Shareholders benefit: Strong dividend history

**How You Profit as a Shareholder:**

**Method 1: Dividends**
- Companies share profits with shareholders
- Usually paid annually or semi-annually
- Example: If you own 100 Safaricom shares and they pay KES 1 per share dividend, you receive KES 100

**Method 2: Capital Appreciation**
- Buy shares when price is low
- Sell when price is high
- Example: Buy KCB shares at KES 40, sell at KES 50 = KES 10 profit per share

**What Makes a Company Profitable?**

1. **Strong Revenue Growth:** Sales increasing year over year
2. **Good Management:** Smart decisions by company leaders
3. **Competitive Advantage:** Something special that sets them apart
4. **Market Demand:** Products/services people need
5. **Efficient Operations:** Controlling costs while growing

**Reading Company Performance:**

Look for:
- Increasing profits over time
- Regular dividend payments
- Growing market share
- Strong brand reputation
- Good corporate governance

**Risk Factors:**

- Economic downturns affect all businesses
- Competition from other companies
- Regulatory changes
- Management problems
- Market volatility

**Smart Investing Principle:**
Invest in businesses you understand. If you use Safaricom services daily, you understand their business model better than a company in an unfamiliar industry.`,
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'How does Safaricom make money?',
                    options: ['Only from M-Pesa', 'Airtime, data, and M-Pesa transactions', 'Government grants', 'Selling phones only'],
                    correctAnswer: 'Airtime, data, and M-Pesa transactions',
                },
                {
                    question: 'What are the two main ways shareholders profit?',
                    options: ['Dividends and capital appreciation', 'Salaries and bonuses', 'Loans and grants', 'Taxes and fees'],
                    correctAnswer: 'Dividends and capital appreciation',
                },
                {
                    question: 'If you own 100 shares and the company pays KES 2 dividend per share, how much do you receive?',
                    options: ['KES 50', 'KES 100', 'KES 200', 'KES 500'],
                    correctAnswer: 'KES 200',
                },
                {
                    question: 'What should you look for in a profitable company?',
                    options: ['Decreasing sales', 'Increasing profits over time', 'No dividends', 'High debt only'],
                    correctAnswer: 'Increasing profits over time',
                },
            ],
        },
    });

    // Module 3: Reading Basic Financial Statements
    await prisma.module.create({
        data: {
            pathId: stocksPath.id,
            title: 'Reading Basic Financial Statements',
            content: `Financial statements tell you how healthy a company is. You don't need to be an accountant - just understand the basics!

**The Three Key Financial Statements:**

**1. Income Statement (Profit & Loss)**
Shows if the company is making money.

Key Items:
- **Revenue:** Total money from sales
- **Expenses:** Costs of running the business
- **Net Profit:** Revenue minus Expenses (the bottom line!)

Example - Simplified Equity Bank:
- Revenue: KES 100 billion (from loans, fees)
- Expenses: KES 70 billion (salaries, operations)
- Net Profit: KES 30 billion ✓ Good!

**2. Balance Sheet**
Shows what the company owns and owes.

Key Items:
- **Assets:** What the company owns (cash, buildings, equipment)
- **Liabilities:** What the company owes (loans, debts)
- **Equity:** Assets minus Liabilities (shareholders' value)

**3. Cash Flow Statement**
Shows how cash moves in and out.

Important because a company can be profitable on paper but run out of cash!

**Key Metrics to Understand:**

**Earnings Per Share (EPS):**
- Company profit divided by number of shares
- Higher EPS = more profitable per share
- Example: KES 30 billion profit ÷ 1 billion shares = KES 30 EPS

**Price-to-Earnings Ratio (P/E):**
- Share price ÷ EPS
- Tells you if a stock is expensive or cheap
- Lower P/E might mean good value (but research why!)

**Dividend Yield:**
- Annual dividend ÷ share price × 100
- Shows return from dividends
- Example: KES 2 dividend ÷ KES 40 share price = 5% yield

**How to Use This Information:**

1. **Compare Year-over-Year:** Is profit growing or shrinking?
2. **Compare to Competitors:** How does Equity Bank compare to KCB?
3. **Look for Trends:** Consistent growth is better than erratic performance
4. **Check Debt Levels:** Too much debt can be risky

**Where to Find Financial Statements:**
- NSE website (www.nse.co.ke)
- Company websites (Investor Relations section)
- Your stockbroker
- Financial news websites

**Red Flags to Watch For:**
- Declining profits for multiple years
- Increasing debt without revenue growth
- Irregular or stopped dividend payments
- Frequent management changes
- Negative cash flow`,
            order: 3,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What does the Income Statement show?',
                    options: ['What the company owns', 'If the company is making profit or loss', 'Future predictions', 'Stock prices'],
                    correctAnswer: 'If the company is making profit or loss',
                },
                {
                    question: 'If a company has KES 20 billion profit and 2 billion shares, what is the EPS?',
                    options: ['KES 5', 'KES 10', 'KES 20', 'KES 40'],
                    correctAnswer: 'KES 10',
                },
                {
                    question: 'What is a red flag when reading financial statements?',
                    options: ['Growing profits', 'Regular dividends', 'Declining profits for multiple years', 'Increasing revenue'],
                    correctAnswer: 'Declining profits for multiple years',
                },
                {
                    question: 'Where can you find company financial statements?',
                    options: ['Only from friends', 'NSE website and company investor relations pages', 'They are secret', 'Only accountants have access'],
                    correctAnswer: 'NSE website and company investor relations pages',
                },
            ],
        },
    });

    // Module 4: Buying Your First Share
    await prisma.module.create({
        data: {
            pathId: stocksPath.id,
            title: 'Buying Your First Share',
            content: `Ready to become a shareholder? Here's your step-by-step guide to buying your first shares on the NSE.

**Step 1: Open a CDS Account**

The Central Depository System (CDS) account holds your shares electronically - like a bank account for stocks.

Requirements:
- Be at least 18 years old
- Valid National ID or Passport
- KRA PIN Certificate
- Passport-sized photo

Where to Open:
- Through a licensed stockbroker
- Through your bank (if they offer brokerage services)
- Process is FREE and takes 3-5 days

**Step 2: Choose a Stockbroker**

Top Licensed Brokers in Kenya:
- NCBA Capital
- Sterling Capital
- Standard Investment Bank (SIB)
- Faida Investment Bank
- AIB-AXYS Africa

What to Consider:
- Fees and commissions (typically 1.3-2% per transaction)
- User-friendly platform
- Customer service quality
- Research and advice offered

**Step 3: Fund Your Trading Account**

- Link your bank account or M-Pesa
- Deposit funds you want to invest
- Start small - even KES 5,000 is enough!

**Step 4: Research and Choose Stocks**

For Beginners, Consider:
- **Blue Chip Stocks:** Large, stable companies (Safaricom, Equity, KCB)
- **Dividend Payers:** Companies with consistent dividend history
- **Sectors You Understand:** Banking, telecommunications, manufacturing

Research Checklist:
✓ Check recent financial performance
✓ Read news about the company
✓ Understand their business model
✓ Check dividend history
✓ Compare P/E ratio to industry average

**Step 5: Place Your Order**

Two Types of Orders:
1. **Market Order:** Buy at current market price (executes immediately)
2. **Limit Order:** Buy only if price reaches your target (may not execute)

Example First Purchase:
- Company: Safaricom
- Current Price: KES 25 per share
- Your Budget: KES 5,000
- Shares to Buy: 200 shares (KES 5,000 ÷ KES 25)
- Broker Fee: ~KES 100
- Total Cost: ~KES 5,100

**Step 6: Monitor Your Investment**

- Check prices regularly (but don't panic over daily changes!)
- Read company announcements
- Review financial reports quarterly
- Reinvest dividends for compound growth

**Investment Strategies for Beginners:**

**1. Diversify:** Don't put all money in one stock
- Example: 40% Safaricom, 30% Equity Bank, 30% EABL

**2. Think Long-Term:** Stock market rewards patience
- Hold for at least 1-3 years
- Don't panic sell during market dips

**3. Dollar-Cost Averaging:** Invest fixed amount regularly
- Example: KES 5,000 every month
- Reduces impact of market volatility

**4. Reinvest Dividends:** Use dividend payments to buy more shares
- Compound growth accelerates wealth

**Common Mistakes to Avoid:**
- Investing money you need soon
- Following "hot tips" without research
- Panic selling during market downturns
- Not diversifying
- Investing without understanding the company

**Next Steps:**
- Open your CDS account this week
- Start with one blue-chip stock
- Learn as you invest
- Gradually build your portfolio`,
            order: 4,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is required to open a CDS account?',
                    options: ['Only money', 'National ID, KRA PIN, and passport photo', 'A university degree', 'KES 1 million deposit'],
                    correctAnswer: 'National ID, KRA PIN, and passport photo',
                },
                {
                    question: 'What is a good investment strategy for beginners?',
                    options: ['Put all money in one stock', 'Diversify across multiple stocks', 'Only invest in foreign companies', 'Never check your investments'],
                    correctAnswer: 'Diversify across multiple stocks',
                },
                {
                    question: 'If you have KES 10,000 and want to buy shares at KES 50 each, how many shares can you buy (ignoring fees)?',
                    options: ['100 shares', '200 shares', '500 shares', '1000 shares'],
                    correctAnswer: '200 shares',
                },
                {
                    question: 'What should you do with dividend payments?',
                    options: ['Spend immediately', 'Reinvest to buy more shares for compound growth', 'Give to friends', 'Hide under mattress'],
                    correctAnswer: 'Reinvest to buy more shares for compound growth',
                },
            ],
        },
    });

    console.log('Created Stocks Path with 4 modules...');

    // ========== LEARNING PATH 3: Peer-to-Peer Lending & Angel Investing ==========
    const p2pPath = await prisma.learningPath.create({
        data: {
            title: 'Peer-to-Peer Lending & Angel Investing',
            description: 'Learn how P2P lending works, how to evaluate business opportunities, manage risk, and build an investment portfolio.',
            level: 'ADVANCED',
        },
    });

    // Module 1: How P2P Lending Works
    await prisma.module.create({
        data: {
            pathId: p2pPath.id,
            title: 'How P2P Lending Works',
            content: `Peer-to-Peer (P2P) lending connects people who have money to invest directly with people who need loans - cutting out traditional banks.

**What is P2P Lending?**

Instead of putting money in a bank savings account earning 3-5%, you lend directly to small businesses and earn 12-18% returns!

**How It Works:**

1. **Borrowers** (small businesses) apply for loans on P2P platforms
2. **Investors** (you!) review loan requests and choose who to fund
3. **Platform** facilitates the transaction and manages repayments
4. **Borrowers** repay with interest over agreed period
5. **Investors** receive monthly repayments with interest

**Kenyan P2P Platforms:**

**Kiva:**
- Zero-interest loans to small entrepreneurs
- Focus on social impact
- Loans up to KES 500,000
- Repayment rates very high

**Pezesha:**
- Microloans to small businesses
- Advanced credit scoring
- Accessible via SMS
- Returns: 12-15% annually

**Zidisha:**
- Global platform active in Kenya
- Minimal documentation required
- Direct borrower-lender connection
- Low default rates

**KenfasP2P:**
- Kenyan marketplace
- Investors can set loan terms
- Returns up to 15% monthly
- Growing platform

**Why P2P Lending?**

**For Investors:**
- Higher returns than savings accounts
- Support local businesses
- Diversify investment portfolio
- Choose your risk level

**For Borrowers:**
- Faster approval than banks
- More flexible terms
- No collateral required (often)
- Build credit history

**Example Investment:**

You invest KES 50,000 across 10 small businesses:
- KES 5,000 to each business
- Average interest: 15% annually
- Expected return: KES 7,500 per year
- Monthly income: ~KES 625

If one business defaults (10% loss):
- Loss: KES 5,000
- Remaining return: KES 2,500
- Still better than 5% savings account!

**Types of P2P Loans:**

1. **Business Loans:** Capital for inventory, equipment
2. **Agricultural Loans:** For farmers buying seeds, fertilizer
3. **Education Loans:** School fees, training courses
4. **Emergency Loans:** Unexpected expenses

**How Platforms Assess Borrowers:**

- Credit history (if available)
- Business revenue and cash flow
- M-Pesa transaction history
- Social connections and guarantors
- Business plan quality
- Repayment capacity

**Key Terms:**

**Default Rate:** Percentage of loans not repaid (typically 5-15%)
**Interest Rate:** Return you earn (typically 12-18% in Kenya)
**Loan Term:** Duration of loan (3-24 months common)
**Diversification:** Spreading money across many loans to reduce risk`,
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is the main advantage of P2P lending over savings accounts?',
                    options: ['Government guaranteed', 'Higher returns (12-18% vs 3-5%)', 'No risk involved', 'Immediate withdrawals'],
                    correctAnswer: 'Higher returns (12-18% vs 3-5%)',
                },
                {
                    question: 'How does P2P lending work?',
                    options: ['Banks lend to businesses', 'Investors lend directly to borrowers through platforms', 'Government provides all funding', 'No repayment required'],
                    correctAnswer: 'Investors lend directly to borrowers through platforms',
                },
                {
                    question: 'If you invest KES 10,000 at 15% annual interest, how much return do you expect in one year?',
                    options: ['KES 500', 'KES 1,000', 'KES 1,500', 'KES 5,000'],
                    correctAnswer: 'KES 1,500',
                },
                {
                    question: 'What is a key risk management strategy in P2P lending?',
                    options: ['Invest all money in one loan', 'Diversify across many small loans', 'Only lend to friends', 'Ignore borrower information'],
                    correctAnswer: 'Diversify across many small loans',
                },
            ],
        },
    });

    // Module 2: Evaluating Business Opportunities
    await prisma.module.create({
        data: {
            pathId: p2pPath.id,
            title: 'Evaluating Business Opportunities',
            content: `Not all business loan requests are equal. Learn how to identify promising opportunities and avoid risky ones.

**The 5 C's of Credit Evaluation:**

**1. Character**
- Is the borrower trustworthy?
- Do they have good references?
- What's their repayment history?
- Are they transparent about their business?

**2. Capacity**
- Can they repay the loan?
- What's their monthly income?
- Do they have steady cash flow?
- What are their existing debts?

**3. Capital**
- How much of their own money have they invested?
- Skin in the game shows commitment
- Example: If asking for KES 50,000, have they invested KES 10,000 themselves?

**4. Collateral**
- What assets back the loan?
- Equipment, inventory, property?
- Not always required but reduces risk

**5. Conditions**
- What will the loan be used for?
- Is it a growing industry?
- What are market conditions?
- Is the loan amount appropriate?

**Red Flags to Watch For:**

🚩 Vague business plan
🚩 Unrealistic profit projections
🚩 No clear repayment source
🚩 Multiple existing loans
🚩 Poor communication
🚩 Reluctance to share information
🚩 Too-good-to-be-true returns promised

**Green Flags (Good Signs):**

✅ Detailed business plan
✅ Existing revenue/customers
✅ Clear use of funds
✅ Realistic projections
✅ Good communication
✅ Transparent financials
✅ Industry experience

**Example Evaluation:**

**Loan Request: Mama Njeri's Grocery**
- Amount: KES 50,000
- Purpose: Buy refrigerator for cold drinks
- Term: 6 months
- Business: 3 years old, 200+ regular customers
- Revenue: KES 120,000/month
- Profit: KES 20,000/month
- Existing debt: None

**Evaluation:**
✅ Character: Established business, good reputation
✅ Capacity: KES 20,000 profit can cover KES 10,000 monthly repayment
✅ Capital: Already invested in shop and inventory
✅ Collateral: Refrigerator itself
✅ Conditions: Cold drinks in demand, especially in hot weather

**Decision: GOOD INVESTMENT** - Low risk, clear repayment capacity

**Questions to Ask Borrowers:**

1. How long have you been in business?
2. Who are your customers?
3. What is your monthly revenue?
4. What are your monthly expenses?
5. How will this loan grow your business?
6. What is your repayment plan?
7. Do you have any existing loans?
8. What happens if business slows down?

**Analyzing Business Plans:**

**Revenue Projections:**
- Are they realistic?
- Based on what assumptions?
- Compare to similar businesses

**Cost Structure:**
- All expenses accounted for?
- Reasonable estimates?
- Buffer for unexpected costs?

**Market Analysis:**
- Is there demand?
- Who are competitors?
- What's the unique value?

**Risk Assessment Framework:**

**Low Risk (Invest More):**
- Established business (2+ years)
- Consistent revenue
- Clear repayment capacity
- Good credit history
- Productive use of funds

**Medium Risk (Invest Cautiously):**
- Newer business (6-24 months)
- Growing but inconsistent revenue
- Reasonable repayment plan
- Limited credit history
- Expansion purposes

**High Risk (Avoid or Invest Very Little):**
- Brand new business
- No revenue yet
- Unclear repayment source
- Poor credit history
- Speculative ventures`,
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What are the 5 C\'s of credit evaluation?',
                    options: ['Cash, Cars, Clothes, Credit, Computers', 'Character, Capacity, Capital, Collateral, Conditions', 'Only Character matters', 'None of these'],
                    correctAnswer: 'Character, Capacity, Capital, Collateral, Conditions',
                },
                {
                    question: 'Which is a RED FLAG when evaluating a loan request?',
                    options: ['Detailed business plan', 'Vague business plan with unrealistic projections', 'Existing customers', 'Clear repayment source'],
                    correctAnswer: 'Vague business plan with unrealistic projections',
                },
                {
                    question: 'If a business makes KES 20,000 profit per month, what is a safe monthly loan repayment amount?',
                    options: ['KES 25,000', 'KES 10,000 or less', 'KES 50,000', 'All the profit'],
                    correctAnswer: 'KES 10,000 or less',
                },
                {
                    question: 'What makes a business LOW RISK for lending?',
                    options: ['Brand new with no customers', 'Established business with consistent revenue', 'No business plan', 'Multiple existing debts'],
                    correctAnswer: 'Established business with consistent revenue',
                },
            ],
        },
    });

    // Module 3: Risk Management
    await prisma.module.create({
        data: {
            pathId: p2pPath.id,
            title: 'Risk Management in P2P Lending',
            content: `P2P lending offers great returns, but also carries risks. Smart investors manage risk to protect their capital while earning good returns.

**Understanding P2P Lending Risks:**

**1. Default Risk**
- Borrower fails to repay
- Most common risk in P2P
- Typical default rate: 5-15% in Kenya
- Can be managed through diversification

**2. Platform Risk**
- P2P platform may fail
- Regulatory changes
- Choose established, regulated platforms

**3. Liquidity Risk**
- Money locked in for loan term
- Cannot withdraw early
- Plan for this when investing

**4. Economic Risk**
- Economic downturn affects repayments
- Businesses struggle during hard times
- Diversify across sectors

**The Golden Rules of P2P Risk Management:**

**Rule 1: Diversify, Diversify, Diversify!**

Never put all eggs in one basket!

Bad Strategy:
- KES 100,000 to one business
- If they default = 100% loss

Good Strategy:
- KES 5,000 to 20 different businesses
- If 2 default = only 10% loss
- Other 18 still generate returns

**Rule 2: Start Small**

- Begin with KES 10,000-20,000
- Learn the platform
- Understand borrower behavior
- Scale up as you gain experience

**Rule 3: Only Invest Money You Can Afford to Lose**

- Not your emergency fund
- Not school fees money
- Not rent money
- Only surplus savings

**Rule 4: Diversify Across Sectors**

Don't lend only to one type of business!

Example Portfolio:
- 30% Retail businesses
- 25% Agriculture
- 20% Services
- 15% Manufacturing
- 10% Technology

If retail sector struggles, others may thrive!

**Rule 5: Check Borrower Quality**

Use the 5 C's from previous module:
- Character, Capacity, Capital, Collateral, Conditions
- Read business plans carefully
- Ask questions
- Trust your instincts

**Risk-Return Trade-off:**

Higher returns = Higher risk

**Conservative Portfolio (Lower Risk, 10-12% returns):**
- 80% established businesses (2+ years)
- 20% newer businesses (6-24 months)
- Longer track records
- Proven repayment capacity

**Balanced Portfolio (Medium Risk, 12-15% returns):**
- 50% established businesses
- 30% growing businesses
- 20% newer ventures
- Mix of risk levels

**Aggressive Portfolio (Higher Risk, 15-18% returns):**
- 40% established businesses
- 30% growing businesses
- 30% new ventures
- Higher potential returns, higher default risk

**Monitoring Your Investments:**

**Weekly:**
- Check for repayment updates
- Review platform notifications

**Monthly:**
- Calculate actual returns
- Track defaults
- Adjust strategy if needed

**Quarterly:**
- Review overall portfolio performance
- Rebalance if necessary
- Reinvest returns

**What to Do When Defaults Happen:**

1. **Stay Calm** - Defaults are expected (5-15%)
2. **Document Everything** - Keep records
3. **Follow Platform Process** - They may recover some funds
4. **Learn** - What warning signs did you miss?
5. **Adjust** - Improve your evaluation process

**Calculating Your Real Returns:**

Example:
- Invested: KES 100,000 across 20 loans
- Expected return: 15% = KES 15,000
- Defaults: 2 loans (KES 10,000 lost)
- Actual return: KES 5,000
- Real return: 5% (still better than savings!)

**Building a Resilient Portfolio:**

**Geographic Diversification:**
- Businesses in different regions
- Reduces local economic impact

**Sector Diversification:**
- Different industries
- Reduces sector-specific risks

**Loan Term Diversification:**
- Mix of 3-month, 6-month, 12-month loans
- Improves liquidity

**Size Diversification:**
- Small loans (KES 2,000-5,000)
- Medium loans (KES 5,000-10,000)
- Larger loans (KES 10,000-20,000)

**Insurance and Guarantees:**

Some platforms offer:
- Buyback guarantees
- Insurance against defaults
- Provision funds
- Check if your platform has these

**Emergency Fund First:**

Before P2P investing:
1. Build 3-6 months emergency fund in savings
2. Pay off high-interest debt
3. Then invest surplus in P2P

**Long-term Success Strategy:**

- Start small, learn, grow
- Reinvest returns for compound growth
- Continuously improve evaluation skills
- Stay disciplined with diversification
- Accept some defaults as cost of doing business`,
            order: 3,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What is the most important risk management strategy in P2P lending?',
                    options: ['Invest all money in one business', 'Diversify across many loans', 'Only lend to family', 'Ignore borrower information'],
                    correctAnswer: 'Diversify across many loans',
                },
                {
                    question: 'What is a typical default rate in Kenyan P2P lending?',
                    options: ['0% - no defaults', '5-15%', '50%', '90%'],
                    correctAnswer: '5-15%',
                },
                {
                    question: 'What type of money should you invest in P2P lending?',
                    options: ['Emergency fund', 'Rent money', 'School fees', 'Only surplus savings you can afford to lose'],
                    correctAnswer: 'Only surplus savings you can afford to lose',
                },
                {
                    question: 'If you invest KES 100,000 across 20 loans and 2 default completely, what is your loss?',
                    options: ['KES 5,000', 'KES 10,000', 'KES 50,000', 'KES 100,000'],
                    correctAnswer: 'KES 10,000',
                },
            ],
        },
    });

    // Module 4: Building an Investment Portfolio
    await prisma.module.create({
        data: {
            pathId: p2pPath.id,
            title: 'Building an Investment Portfolio',
            content: `A well-structured investment portfolio combines different assets to maximize returns while managing risk. Let's build yours!

**What is an Investment Portfolio?**

Your portfolio is the collection of all your investments:
- Stocks (NSE shares)
- P2P loans
- Savings accounts
- Bonds
- Business investments
- Real estate (if applicable)

**Asset Allocation by Age and Goals:**

**Young Investor (20-35 years):**
- 40% Stocks (NSE)
- 30% P2P Lending
- 20% Business/Side Hustle
- 10% Emergency Savings

Why? Time to recover from risks, focus on growth

**Mid-Career (35-50 years):**
- 35% Stocks (NSE)
- 25% P2P Lending
- 20% Bonds/Fixed Income
- 20% Emergency/Savings

Why? Balance growth with stability

**Pre-Retirement (50+ years):**
- 25% Stocks (NSE)
- 15% P2P Lending
- 40% Bonds/Fixed Income
- 20% Cash/Savings

Why? Preserve capital, reduce risk

**Building Your Portfolio Step-by-Step:**

**Step 1: Emergency Fund (Foundation)**
- Save 3-6 months of expenses
- Keep in accessible savings account
- Non-negotiable first step!

Example: If monthly expenses = KES 30,000
Emergency fund = KES 90,000-180,000

**Step 2: Clear High-Interest Debt**
- Pay off loans above 15% interest
- Credit card debt
- Mobile loans
- Then start investing

**Step 3: Start Investing**

**Month 1-3: Learn & Start Small**
- KES 5,000 in NSE (one blue-chip stock)
- KES 5,000 in P2P (across 5 loans)
- Total: KES 10,000

**Month 4-6: Build Consistency**
- Add KES 5,000/month to investments
- Diversify stocks (add 2nd company)
- Increase P2P loans (now 10 loans)

**Month 7-12: Scale Up**
- Invest KES 10,000/month
- Portfolio growing to KES 100,000+
- Proper diversification achieved

**Sample Portfolio: KES 100,000**

**Conservative (Low Risk):**
- KES 50,000: NSE blue-chip stocks (Safaricom, Equity)
- KES 30,000: P2P established businesses
- KES 20,000: Bonds/Fixed deposits

Expected Return: 10-12% annually

**Balanced (Medium Risk):**
- KES 40,000: NSE stocks (mix of blue-chip and growth)
- KES 40,000: P2P lending (diversified)
- KES 20,000: Emergency buffer

Expected Return: 12-15% annually

**Aggressive (Higher Risk):**
- KES 45,000: NSE stocks (including smaller companies)
- KES 45,000: P2P lending (including newer businesses)
- KES 10,000: Speculative investments

Expected Return: 15-18% annually (with higher volatility)

**Rebalancing Your Portfolio:**

**Why Rebalance?**
- Investments grow at different rates
- Maintain desired risk level
- Lock in profits from winners

**When to Rebalance:**
- Every 6-12 months
- When allocation shifts 10%+ from target
- After major life changes

**Example:**
Target: 50% stocks, 50% P2P
After 1 year: Stocks grew to 60%, P2P is 40%
Action: Sell some stocks, buy more P2P loans

**Tracking Performance:**

**Key Metrics:**

**1. Total Return**
(Current Value - Initial Investment) / Initial Investment × 100

Example:
- Invested: KES 100,000
- Current value: KES 115,000
- Return: 15%

**2. Annualized Return**
For investments held over multiple years

**3. Return vs. Benchmark**
- Compare to NSE index
- Compare to savings account rate
- Are you beating inflation (5-7%)?

**Portfolio Growth Example:**

**Year 1:**
- Start: KES 0
- Monthly investment: KES 10,000
- End: KES 120,000 (invested)
- Returns: KES 12,000 (10%)
- Total: KES 132,000

**Year 2:**
- Start: KES 132,000
- Monthly investment: KES 10,000
- End: KES 252,000 (invested)
- Returns: KES 30,000 (12%)
- Total: KES 282,000

**Year 3:**
- Start: KES 282,000
- Monthly investment: KES 10,000
- End: KES 402,000 (invested)
- Returns: KES 55,000 (14%)
- Total: KES 457,000

**The Power of Compound Growth!**

**Common Portfolio Mistakes:**

❌ No emergency fund before investing
❌ Putting all money in one asset
❌ Panic selling during market dips
❌ Chasing "hot tips"
❌ Not reinvesting dividends
❌ Ignoring fees and taxes
❌ No clear investment goals

**Portfolio Checklist:**

✅ Emergency fund in place
✅ High-interest debt paid off
✅ Clear investment goals
✅ Diversified across assets
✅ Regular monthly contributions
✅ Tracking performance
✅ Rebalancing annually
✅ Reinvesting returns

**Next Steps:**

1. Calculate your emergency fund need
2. Set monthly investment amount
3. Choose your risk level
4. Open necessary accounts (CDS, P2P platform)
5. Start with small amounts
6. Learn and adjust
7. Stay consistent!

**Remember:**
- Investing is a marathon, not a sprint
- Consistency beats timing
- Diversification protects wealth
- Knowledge reduces risk
- Start today, even if small!`,
            order: 4,
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            quizQuestions: [
                {
                    question: 'What should you do BEFORE starting to invest?',
                    options: ['Buy expensive stocks', 'Build a 3-6 month emergency fund', 'Quit your job', 'Borrow money to invest'],
                    correctAnswer: 'Build a 3-6 month emergency fund',
                },
                {
                    question: 'How often should you rebalance your portfolio?',
                    options: ['Every day', 'Every week', 'Every 6-12 months', 'Never'],
                    correctAnswer: 'Every 6-12 months',
                },
                {
                    question: 'For a young investor (20-35), what is a good asset allocation?',
                    options: ['100% savings account', '40% stocks, 30% P2P, 20% business, 10% emergency savings', '100% P2P lending', '100% cash'],
                    correctAnswer: '40% stocks, 30% P2P, 20% business, 10% emergency savings',
                },
                {
                    question: 'If you invest KES 100,000 and it grows to KES 115,000, what is your return?',
                    options: ['5%', '10%', '15%', '20%'],
                    correctAnswer: '15%',
                },
            ],
        },
    });

    console.log('Created P2P Path with 4 modules...');
    console.log('✅ Seed data created successfully! Total: 3 paths, 12 modules');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
