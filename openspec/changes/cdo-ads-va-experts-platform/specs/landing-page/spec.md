## ADDED Requirements

### Requirement: Hero Section Display
The system SHALL render a hero section with dynamic headline, sub-headline, and dual CTA buttons on the landing page.

#### Scenario: Hero renders with correct content
- **WHEN** user visits the landing page
- **THEN** hero displays headline "Your Ads Don't Need More Clicks. They Need Better Next Steps."
- **AND** sub-headline introduces Facebook Ads & VA management services
- **AND** primary CTA shows "Book a Free Consultation"
- **AND** secondary CTA shows "Claim ₱1,000 OFF Promo"

#### Scenario: Hero CTAs navigate correctly
- **WHEN** user clicks "Book a Free Consultation"
- **THEN** page scrolls to booking portal section or opens booking modal
- **WHEN** user clicks "Claim ₱1,000 OFF Promo"
- **THEN** page scrolls to promo section or applies promo code

### Requirement: Services Showcase
The system SHALL display four interactive service cards for Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products.

#### Scenario: Services grid renders correctly
- **WHEN** user scrolls to services section
- **THEN** four cards display in responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- **AND** each card shows service icon, title, description, and feature list
- **AND** cards have hover/tap interaction with gold accent border

#### Scenario: Service cards are accessible
- **WHEN** user navigates via keyboard
- **THEN** cards are focusable with visible focus ring
- **AND** screen readers announce service name and description

### Requirement: Interactive Funnel Explainer Widget
The system SHALL render an interactive customer journey diagram (Ad → Click → Inquiry → Follow-Up → Sale) with a self-assessment checklist.

#### Scenario: Funnel diagram displays journey steps
- **WHEN** user views funnel section
- **THEN** five connected nodes display with labels: Ad, Click, Inquiry, Follow-Up, Sale
- **AND** connecting arrows show flow direction
- **AND** each node has hover state revealing detail tooltip

#### Scenario: Self-assessment checklist functions
- **WHEN** user interacts with checklist items
- **THEN** checkboxes toggle checked/unchecked state
- **AND** checked items persist during session
- **AND** "Is your customer journey losing money?" headline displays above checklist

### Requirement: Special Offers & Promo Banner
The system SHALL display a dedicated promotional callout section with active promo code and discount details.

#### Scenario: Promo banner displays active offer
- **WHEN** user views promo section
- **THEN** banner shows promo code "VA1000"
- **AND** discount text "₱1,000 OFF for first-time clients"
- **AND** CTA button to apply/claim offer
- **AND** gold accent styling distinguishes from other sections

### Requirement: Social Proof & Testimonials
The system SHALL render a carousel/grid of client testimonials with 100% recommendation rate indicator.

#### Scenario: Testimonials display correctly
- **WHEN** user views testimonials section
- **THEN** at least 3 testimonials display in carousel (desktop) or stack (mobile)
- **AND** each shows client name, business, rating (5 stars), and quote
- **AND** "100% Recommendation Rate" badge displays prominently
- **AND** auto-advance carousel with pause on hover

#### Scenario: Testimonials are accessible
- **WHEN** user navigates carousel via keyboard
- **THEN** previous/next buttons are focusable
- **AND** aria-labels describe navigation actions
- **AND** reduced motion preference disables auto-advance

### Requirement: Branded Footer
The system SHALL render a footer with social links, office location, operating hours, and contact details.

#### Scenario: Footer displays all required information
- **WHEN** user scrolls to footer
- **THEN** social media links (Facebook, Instagram, LinkedIn) with icons
- **AND** office address: "Cagayan de Oro City, Philippines"
- **AND** operating hours (e.g., "Mon-Fri 9AM-6PM PHT")
- **AND** contact email and phone number
- **AND** copyright notice with current year

### Requirement: Mobile Responsive Layout
The system SHALL render all landing page sections correctly across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports.

#### Scenario: Layout adapts to viewport
- **WHEN** viewport width changes
- **THEN** hero stacks vertically on mobile
- **AND** services grid reflows (1→2→4 columns)
- **AND** funnel diagram stacks vertically on mobile
- **AND** testimonials switch from carousel to stack
- **AND** footer stacks contact info vertically

### Requirement: Performance Optimization
The system SHALL achieve Lighthouse Performance score ≥90 on landing page.

#### Scenario: Page loads within thresholds
- **WHEN** Lighthouse audit runs on landing page
- **THEN** First Contentful Paint < 1.8s
- **AND** Largest Contentful Paint < 2.5s
- **AND** Cumulative Layout Shift < 0.1
- **AND** Total Blocking Time < 200ms