## ADDED Requirements

### Requirement: Color Palette Tokens
The system SHALL define design tokens for the brand color palette in Tailwind CSS configuration.

#### Scenario: Dark navy background token available
- **WHEN** Tailwind config loads
- **THEN** `colors.navy.DEFAULT` = `#0A0F1D` (primary background)
- **AND** `colors.navy.light` = `#111827` (elevated surfaces)
- **AND** `colors.navy.dark` = `#030712` (deep backgrounds)

#### Scenario: Gold/yellow accent tokens available
- **WHEN** Tailwind config loads
- **THEN** `colors.gold.DEFAULT` = `#EAB308` (primary accent)
- **AND** `colors.gold.light` = `#FDE047` (hover states)
- **AND** `colors.gold.dark` = `#CA8A04` (active/pressed states)
- **AND** `colors.gold.muted` = `rgba(234, 179, 8, 0.1)` (subtle backgrounds)

#### Scenario: Typography color tokens available
- **WHEN** Tailwind config loads
- **THEN** `colors.foreground.DEFAULT` = `#FFFFFF` (primary text on navy)
- **AND** `colors.foreground.muted` = `#9CA3AF` (secondary text)
- **AND** `colors.foreground.onGold` = `#0A0F1D` (text on gold backgrounds)

### Requirement: Typography Scale
The system SHALL define a responsive typography scale using CSS variables and Tailwind utilities.

#### Scenario: Heading scale defined
- **WHEN** typography loads
- **THEN** `text-display-xl` = `clamp(3rem, 8vw, 5rem)` / leading-tight / font-bold
- **AND** `text-display-lg` = `clamp(2.25rem, 6vw, 3.5rem)` / leading-tight / font-bold
- **AND** `text-display-md` = `clamp(1.875rem, 4vw, 2.5rem)` / leading-snug / font-semibold
- **AND** `text-display-sm` = `clamp(1.5rem, 3vw, 2rem)` / leading-snug / font-semibold

#### Scenario: Body scale defined
- **WHEN** typography loads
- **THEN** `text-body-lg` = `1.125rem` / leading-relaxed
- **AND** `text-body` = `1rem` / leading-relaxed
- **AND** `text-body-sm` = `0.875rem` / leading-normal
- **AND** `text-caption` = `0.75rem` / leading-normal

#### Scenario: Font families configured
- **WHEN** fonts load
- **THEN** `font-sans` = `'Inter', system-ui, sans-serif` (primary)
- **AND** `font-display` = `'Cal Sans', 'Inter', system-ui, sans-serif` (headlines)
- **AND** `font-mono` = `'JetBrains Mono', monospace` (code)

### Requirement: Spacing & Layout Tokens
The system SHALL define consistent spacing scale and container widths.

#### Scenario: Spacing scale follows 4px base
- **WHEN** spacing tokens used
- **THEN** `space-1` = `0.25rem` (4px) through `space-32` = `8rem` (128px)
- **AND** container max-widths: `container-sm` = `640px`, `container-md` = `768px`, `container-lg` = `1024px`, `container-xl` = `1280px`, `container-2xl` = `1536px`

### Requirement: Border Radius & Shadow Tokens
The system SHALL define consistent border radius and elevation shadows.

#### Scenario: Border radius scale
- **WHEN** radius tokens used
- **THEN** `radius-none` = `0`, `radius-sm` = `0.25rem`, `radius-md` = `0.375rem`, `radius-lg` = `0.5rem`, `radius-xl` = `0.75rem`, `radius-2xl` = `1rem`, `radius-full` = `9999px`

#### Scenario: Shadow scale with gold accent option
- **WHEN** shadow tokens used
- **THEN** `shadow-sm` through `shadow-2xl` standard
- **AND** `shadow-gold` = `0 0 0 1px #EAB308, 0 4px 14px rgba(234, 179, 8, 0.3)` (focus/hover)
- **AND** `shadow-gold-lg` = `0 0 0 2px #EAB308, 0 10px 25px rgba(234, 179, 8, 0.4)` (prominent CTAs)

### Requirement: Animation & Transition Tokens
The system SHALL define consistent motion tokens respecting reduced motion.

#### Scenario: Transition durations defined
- **WHEN** transitions used
- **THEN** `duration-fast` = `150ms`, `duration-normal` = `250ms`, `duration-slow` = `350ms`
- **AND** `ease-out` = `cubic-bezier(0.16, 1, 0.3, 1)`, `ease-in-out` = `cubic-bezier(0.4, 0, 0.2, 1)`

#### Scenario: Reduced motion respected
- **WHEN** `prefers-reduced-motion: reduce`
- **THEN** all transitions/animations disabled or < 50ms
- **AND** carousel auto-advance paused
- **AND** scroll animations disabled

### Requirement: Base UI Components (Shadcn Extensions)
The system SHALL provide branded variants of Shadcn UI components.

#### Scenario: Button variants match brand
- **WHEN** `Button` component used
- **THEN** `variant="default"` = gold background, navy text, gold hover
- **AND** `variant="outline"` = navy background, gold border, gold text, gold hover fill
- **AND** `variant="ghost"` = transparent, gold text, navy hover background
- **AND** `variant="destructive"` = red-600 background (unchanged)
- **AND** all variants have `focus-visible:ring-2 focus-visible:ring-gold`

#### Scenario: Card component branded
- **WHEN** `Card` component used
- **THEN** `Card` background = `navy.light`, border = `navy.dark`
- **AND** `CardHover` variant adds `hover:border-gold transition-colors`

#### Scenario: Input/Form components branded
- **WHEN** `Input`, `Textarea`, `Select` used
- **THEN** background = `navy`, border = `navy.dark`, focus border = `gold`
- **AND** placeholder = `foreground.muted`
- **AND** error state border = `red-500`, focus ring = `red-500`

#### Scenario: Badge/Label components
- **WHEN** `Badge` used
- **THEN** `variant="gold"` = gold background, navy text
- **AND** `variant="navy"` = navy background, gold text
- **AND** `variant="outline"` = transparent, gold border, gold text

### Requirement: Icon System
The system SHALL use Lucide React icons with consistent sizing and color inheritance.

#### Scenario: Icon sizing tokens
- **WHEN** icons used
- **THEN** `icon-xs` = `14px`, `icon-sm` = `16px`, `icon-md` = `20px`, `icon-lg` = `24px`, `icon-xl` = `32px`
- **AND** icons inherit `currentColor` for automatic theme adaptation

### Requirement: Global Styles & CSS Variables
The system SHALL apply global base styles via `app/globals.css` with CSS variables.

#### Scenario: Root variables define theme
- **WHEN** globals.css loads
- **THEN** `:root` defines all color, spacing, radius, font CSS variables
- **AND** `@media (prefers-color-scheme: dark)` not used (single dark theme)
- **AND** `html` has `scroll-behavior: smooth`, `font-smoothing: antialiased`

#### Scenario: Selection styles branded
- **WHEN** user selects text
- **THEN** `::selection` background = `gold`, color = `navy`