import { Request, Response } from 'express';

const dummyInvestments = [
    {
        id: '1',
        title: "Mama Njeri's Grocery Store",
        description: 'Established neighborhood grocery looking to expand inventory and add refrigeration unit. Currently serves 200+ households in Nairobi with fresh produce and household essentials.',
        businessCategory: 'Retail',
        amountRequested: 50000,
        amountRaised: 32000,
        returnRate: 12,
        duration: '6 months',
        riskLevel: 'Low',
        businessPlan: 'Expand product range and add cold storage for dairy and beverages',
        monthlyRevenue: 120000,
        profitMargin: 18,
    },
    {
        id: '2',
        title: 'Boda Boda Fleet Expansion',
        description: 'Registered boda boda business adding 3 motorcycles to meet demand in Eastlands area. Experienced riders with established customer base.',
        businessCategory: 'Transportation',
        amountRequested: 150000,
        amountRaised: 45000,
        returnRate: 15,
        duration: '12 months',
        riskLevel: 'Medium',
        businessPlan: 'Purchase 3 motorcycles and safety equipment for expansion',
        monthlyRevenue: 180000,
        profitMargin: 25,
    },
    {
        id: '3',
        title: 'Poultry Farm Setup',
        description: 'Capital to build a coop and buy 500 chicks for a new poultry farm in Kiambu. Experienced farmer with land already secured.',
        businessCategory: 'Agriculture',
        amountRequested: 100000,
        amountRaised: 65000,
        returnRate: 14,
        duration: '9 months',
        riskLevel: 'Medium',
        businessPlan: 'Construct chicken coop, purchase chicks, and feed for first 3 months',
        monthlyRevenue: 85000,
        profitMargin: 22,
    },
    {
        id: '4',
        title: 'Beauty Salon Expansion',
        description: 'Popular salon in Westlands looking to add hair treatment services and modern equipment. 5 years in business with loyal clientele.',
        businessCategory: 'Beauty & Personal Care',
        amountRequested: 80000,
        amountRaised: 55000,
        returnRate: 13,
        duration: '8 months',
        riskLevel: 'Low',
        businessPlan: 'Purchase professional hair treatment equipment and training for staff',
        monthlyRevenue: 150000,
        profitMargin: 35,
    },
    {
        id: '5',
        title: 'Tailoring Business Equipment',
        description: 'Skilled tailor needs industrial sewing machines to take on larger orders from schools and businesses. Currently operating with 2 domestic machines.',
        businessCategory: 'Manufacturing',
        amountRequested: 60000,
        amountRaised: 20000,
        returnRate: 16,
        duration: '10 months',
        riskLevel: 'Low',
        businessPlan: 'Purchase 2 industrial sewing machines and overlock machine',
        monthlyRevenue: 95000,
        profitMargin: 28,
    },
    {
        id: '6',
        title: 'Mobile Phone Repair Shop',
        description: 'Tech-savvy entrepreneur opening phone repair shop in busy market area. Certified technician with 3 years experience.',
        businessCategory: 'Technology',
        amountRequested: 70000,
        amountRaised: 15000,
        returnRate: 18,
        duration: '6 months',
        riskLevel: 'Medium',
        businessPlan: 'Rent shop space, purchase repair tools and initial spare parts inventory',
        monthlyRevenue: 110000,
        profitMargin: 32,
    },
    {
        id: '7',
        title: 'Fresh Juice Kiosk',
        description: 'Starting a fresh juice and smoothie kiosk near university campus. Prime location with high foot traffic from students.',
        businessCategory: 'Food & Beverage',
        amountRequested: 45000,
        amountRaised: 30000,
        returnRate: 14,
        duration: '5 months',
        riskLevel: 'Low',
        businessPlan: 'Purchase commercial blender, refrigerator, and initial fruit inventory',
        monthlyRevenue: 75000,
        profitMargin: 40,
    },
];

export const getInvestments = (req: Request, res: Response) => {
    res.json(dummyInvestments);
};

export const getInvestment = (req: Request, res: Response) => {
    const { id } = req.params;
    const investment = dummyInvestments.find((inv) => inv.id === id);

    if (!investment) {
        return res.status(404).json({ message: 'Investment not found' });
    }

    res.json(investment);
};
