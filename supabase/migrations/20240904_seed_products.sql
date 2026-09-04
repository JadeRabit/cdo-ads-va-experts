-- Seed initial digital products
INSERT INTO public.products (id, name, slug, description, short_description, price, currency, image_path, file_path, features, category, is_active)
VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Facebook Ads Campaign Template Kit',
    'facebook-ads-campaign-template-kit',
    'Stop building campaigns from scratch. This comprehensive kit includes 12 proven campaign structures for e-commerce, lead generation, local businesses, and info products. Each template comes with audience targeting recommendations, budget allocation formulas, creative testing frameworks, and scaling checklists. Built from managing 100M+ in ad spend across multiple verticals.',
    'Complete campaign structure templates for e-commerce, lead gen, and local businesses',
    149900,
    'PHP',
    'products/ads-template-kit.jpg',
    'products/facebook-ads-campaign-template-kit.zip',
    '[
        "12 ready-to-launch campaign structures",
        "Audience targeting cheat sheets per vertical",
        "Budget allocation formulas (daily/lifetime)",
        "Creative testing framework (3-phase)",
        "Scaling checklists (horizontal & vertical)",
        "Exclusion & negative audience lists",
        "Custom conversion setup guides",
        "Client presentation templates"
    ]'::jsonb,
    'Templates',
    true
),
(
    '22222222-2222-2222-2222-222222222222',
    'Client Onboarding & SOP Bundle',
    'client-onboarding-sop-bundle',
    'Professionalize your agency onboarding with this complete bundle. Includes service agreements, discovery questionnaires, 15+ standard operating procedures, and step-by-step checklists. Everything you need to onboard clients smoothly, set expectations, and deliver consistent results. Used by 50+ agencies.',
    'Contracts, questionnaires, SOPs, and checklists for agency client onboarding',
    99900,
    'PHP',
    'products/onboarding-bundle.jpg',
    'products/client-onboarding-sop-bundle.zip',
    '[
        "Master service agreement template",
        "Project-specific addendums (Ads, SMM, VA)",
        "Discovery questionnaire (15 sections)",
        "Kickoff meeting agenda & checklist",
        "15+ SOPs (campaign setup, reporting, comms)",
        "Client portal setup guide",
        "30/60/90 day milestone templates",
        "Offboarding & renewal templates"
    ]'::jsonb,
    'Operations',
    true
),
(
    '33333333-3333-3333-3333-333333333333',
    'Ad Creative Brief & Report Templates',
    'ad-creative-brief-report-templates',
    'Never stare at a blank page again. Professional creative brief templates that get alignment fast, weekly/monthly performance report templates that clients actually understand, and presentation decks that showcase your value. Includes Figma, Canva, and Google Slides formats.',
    'Professional creative briefs, performance reports, and client presentation decks',
    79900,
    'PHP',
    'products/creative-templates.jpg',
    'products/ad-creative-brief-report-templates.zip',
    '[
        "Creative brief template (Figma/Canva/Slides)",
        "Weekly performance report (automated formulas)",
        "Monthly executive report template",
        "Quarterly business review deck",
        "Creative testing results template",
        "Client-facing dashboard (Looker Studio)",
        "Ad creative swipe file organizer",
        "Brand guidelines one-pager"
    ]'::jsonb,
    'Reporting',
    true
),
(
    '44444444-4444-4444-4444-444444444444',
    'VA Hiring & Training Checklist',
    'va-hiring-training-checklist',
    'The exact process we use to hire and train VAs who manage ad accounts, handle leads, and provide customer support. Includes job descriptions that attract quality candidates, interview scorecards, a 30-day training curriculum, and performance metrics. Free because every business deserves great support.',
    'Step-by-step process to hire, onboard, and train high-performing virtual assistants',
    0,
    'PHP',
    'products/va-checklist.jpg',
    'products/va-hiring-training-checklist.zip',
    '[
        "Job description templates (Ads VA, Support VA, Lead VA)",
        "Interview scorecards with rubric",
        "Test task assignments with grading guide",
        "30-day training curriculum (week-by-week)",
        "SOPs for common VA tasks",
        "Performance dashboard template",
        "Communication protocols & tools setup",
        "Bonus: VA compensation guide (PH rates)"
    ]'::jsonb,
    'Free',
    true
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    short_description = EXCLUDED.short_description,
    price = EXCLUDED.price,
    currency = EXCLUDED.currency,
    image_path = EXCLUDED.image_path,
    file_path = EXCLUDED.file_path,
    features = EXCLUDED.features,
    category = EXCLUDED.category,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();