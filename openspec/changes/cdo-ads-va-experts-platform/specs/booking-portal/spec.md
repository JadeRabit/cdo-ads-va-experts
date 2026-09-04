## ADDED Requirements

### Requirement: Consultation Scheduler
The system SHALL provide an integrated consultation scheduling interface allowing clients to book ad audit or discovery calls.

#### Scenario: Calendly embed loads and functions
- **WHEN** user visits booking section
- **THEN** Calendly widget loads asynchronously without blocking page render
- **AND** widget displays available time slots for "Ad Audit" and "Discovery Call" event types
- **AND** user can select date/time and proceed to Calendly booking flow

#### Scenario: Custom booking form alternative
- **WHEN** Calendly fails to load or user prefers custom form
- **THEN** fallback custom form displays with date/time picker
- **AND** form validates required fields: name, email, service type, preferred date/time
- **AND** submission creates booking record in Supabase

### Requirement: Inquiry Form Lead Capture
The system SHALL capture lead inquiries via a validated form submitting to Supabase.

#### Scenario: Inquiry form accepts valid submission
- **WHEN** user fills all required fields (Name, Email, Business Name, Monthly Ad Budget, Service Needed)
- **AND** clicks "Submit Inquiry"
- **THEN** form validates email format and required fields
- **AND** submits data to Supabase `inquiries` table
- **AND** displays success toast notification
- **AND** clears form after successful submission

#### Scenario: Inquiry form rejects invalid input
- **WHEN** user submits with missing required fields
- **THEN** inline validation errors display for each missing field
- **AND** form does not submit
- **WHEN** user submits invalid email format
- **THEN** email field shows "Invalid email format" error
- **AND** form does not submit

#### Scenario: Inquiry form prevents spam
- **WHEN** form is submitted
- **THEN** honeypot field (hidden) must be empty
- **AND** rate limit: max 5 submissions per IP per hour
- **AND** suspicious submissions logged but not stored as leads

### Requirement: Booking Confirmation & Notifications
The system SHALL send confirmation notifications for bookings and inquiries.

#### Scenario: Email confirmation sent on booking
- **WHEN** booking is created via Calendly or custom form
- **THEN** confirmation email sent to client with booking details
- **AND** internal notification sent to agency team (Slack/email)
- **AND** booking stored in Supabase `bookings` table with status "confirmed"

#### Scenario: Inquiry acknowledgment sent
- **WHEN** inquiry form submits successfully
- **THEN** auto-reply email sent to inquirer acknowledging receipt
- **AND** internal team notified with inquiry details
- **AND** inquiry stored in Supabase `inquiries` table with status "new"

### Requirement: Booking Portal Accessibility
The system SHALL ensure booking forms and scheduler meet WCAG AA accessibility standards.

#### Scenario: Forms are keyboard navigable
- **WHEN** user tabs through booking form
- **THEN** all inputs, selects, buttons reachable in logical order
- **AND** focus indicators visible on all interactive elements
- **AND** Calendly iframe is keyboard accessible

#### Scenario: Screen reader support
- **WHEN** screen reader user accesses booking section
- **THEN** form labels associated with inputs via `htmlFor`/`id`
- **AND** required fields announced as required
- **AND** error messages announced via `aria-live`
- **AND** Calendly widget has accessible name