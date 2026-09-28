AquaCore Development Roadmap

1. Purpose

This roadmap defines the recommended implementation order for the AquaCore platform.

The project should be built incrementally. Each phase should produce a working, testable improvement before the next phase begins.

The roadmap is intentionally separated into small implementation tasks rather than large feature batches.

The roadmap does not replace the PRD, architecture document, guardrails, or agent instructions. Those documents define what the system is. This document defines the order in which it should be built.

⸻

2. Development Principles

All implementation should follow these principles:

1. Build the smallest useful version first.
2. Complete and verify one small task before starting the next.
3. Do not implement features that are not currently required.
4. Do not invent unresolved business rules.
5. Keep business logic on the backend.
6. Preserve working functionality when making changes.
7. Prefer simple architecture over premature complexity.
8. Test important backend and business rules as they are introduced.
9. Keep the customer experience and admin experience connected to the real business workflow.
10. Stop and confirm when a decision requires information from the organisation.

⸻

3. Roadmap Overview

Phase 0: Project Foundation

Establish the repository and development environment.

Phase 1: Backend Foundation

Create the Express API, Prisma setup, database connection, configuration, and health checks.

Phase 2: Frontend Foundation

Create the Next.js application structure, design system foundations, API client, and basic layouts.

Phase 3: Authentication

Implement customer and admin authentication and authorization.

Phase 4: Core Organisation Data

Implement programs, locations, and the basic public organisation experience.

Phase 5: Customer Booking

Implement booking requests, participants, configurable pricing, and customer booking history.

Phase 6: Payments

Integrate Paystack and connect verified payments to bookings.

Phase 7: Admin Operations

Build the administrative workflows required to operate the organisation.

Phase 8: Certificates

Implement certificate records, digital certificates, and public verification.

Phase 9: Online Learning

Implement the LMS after the core booking and operational system is stable.

Phase 10: Content, Notifications, and Product Polish

Expand content management, notifications, SEO, accessibility, and user experience.

Phase 11: Testing, Deployment, and Launch

Harden the system and prepare the production environment.

⸻

4. Phase 0: Project Foundation

Goal

Create the initial monorepo structure without implementing business functionality.

Tasks

* Create repository structure.
* Create apps/web.
* Create apps/api.
* Create packages/shared.
* Configure package management/workspaces.
* Configure TypeScript.
* Configure formatting/linting if needed.
* Confirm development scripts.
* Confirm both applications can start.
* Create basic environment variable examples.
* Confirm the repository structure matches AND.md.

Verification

Both applications should start successfully and the repository should have a clean, understandable foundation.

⸻

5. Phase 1: Backend Foundation

Goal

Create a minimal Express API connected to PostgreSQL through Prisma.

Tasks

1. Express setup

* Create Express application.
* Add TypeScript configuration.
* Add API entry point.
* Add environment configuration.
* Add basic middleware.
* Add centralized error handling.

2. Database setup

* Configure Prisma.
* Configure PostgreSQL connection.
* Create initial Prisma schema structure.
* Create migration.
* Verify database connection.

3. Health endpoint

* Add /api/v1/health.
* Return basic API status.
* Optionally verify database connectivity.

Verification

The API starts, connects to the database, and responds successfully to the health endpoint.

⸻

6. Phase 2: Frontend Foundation

Goal

Create the basic Next.js application and establish the visual foundation.

Tasks

* Configure Next.js and TypeScript.
* Configure Tailwind CSS.
* Configure shadcn/ui.
* Establish typography.
* Establish design tokens.
* Create shared UI primitives where needed.
* Create public site shell.
* Create customer dashboard shell.
* Create admin dashboard shell.
* Create basic responsive navigation.
* Create API client layer.
* Create loading, empty, and error patterns.

Verification

The application has a consistent visual foundation and the three major UI areas can render independently.

No business functionality should be added just to make the interface look complete.

⸻

7. Phase 3: Authentication

Goal

Allow customers and administrators to securely access the platform.

Tasks

Backend

* Create User model.
* Create password hashing.
* Create registration endpoint.
* Create login endpoint.
* Create logout endpoint.
* Implement JWT authentication.
* Store authentication tokens securely using HttpOnly cookies.
* Create authentication middleware.
* Create role authorization.
* Add password reset foundation if required for MVP.

Frontend

* Create registration page.
* Create login page.
* Create logout flow.
* Create protected customer routes.
* Create protected admin routes.
* Handle authentication errors and expired sessions.

Verification

A customer can register, log in, access their protected area, and log out.

An administrator can access admin routes while a customer cannot.

⸻

8. Phase 4: Core Organisation Data

Goal

Create the data and public experience needed for customers to understand what the organisation offers.

Tasks

Programs

* Create Program model.
* Create program categories/types.
* Create admin CRUD for programs.
* Create public programs listing.
* Create program detail page.

Locations

* Create Location model.
* Create admin CRUD for locations.
* Create public locations listing.
* Support different location types.

Public organisation pages

* Home.
* About.
* Programs.
* Program details.
* Locations.
* Contact.
* FAQ.

Verification

An administrator can create a program and location, and customers can discover the published information publicly.

Pricing and business rules should remain configurable.

⸻

9. Phase 5: Customer Booking

Goal

Replace the basic manual booking workflow with a structured booking request.

Booking flow

Program
   ↓
Location
   ↓
Preferred Date & Time
   ↓
Participant Details
   ↓
Price Review
   ↓
Payment
   ↓
Booking Pending
   ↓
Admin Review
   ↓
Confirmed / Reschedule Requested / Rejected

Tasks

Backend

* Create Booking model.
* Create BookingParticipant model.
* Implement booking creation.
* Implement ownership checks.
* Implement configurable pricing.
* Implement booking status transitions.
* Prevent invalid state transitions.
* Add booking retrieval for customers.

Frontend

* Create booking flow.
* Create participant form.
* Show calculated price.
* Create booking review page.
* Create customer booking history.
* Create booking detail page.

Verification

A customer can submit a valid booking request and see it in their dashboard.

The backend remains authoritative for price and booking status.

⸻

10. Phase 6: Payments

Goal

Connect customer payments to the booking process using Paystack.

Tasks

* Configure Paystack credentials.
* Create payment record.
* Generate payment reference server-side.
* Initialize Paystack transaction.
* Redirect customer to payment.
* Verify transaction server-side.
* Update payment status.
* Connect successful payment to booking.
* Handle failed payments.
* Prevent duplicate payment processing.
* Display payment status to customers.

Important Rule

The frontend must never be treated as proof that payment succeeded.

The backend must verify the transaction with Paystack before marking a payment successful.

Verification

A customer can pay for a booking and the backend correctly records the verified payment.

⸻

11. Phase 7: Admin Operations

Goal

Give the organisation a practical dashboard for daily operations.

Tasks

Dashboard

* Create admin overview.
* Show useful operational metrics.
* Show recent bookings.
* Show payment activity where appropriate.

Customers

* Customer list.
* Customer details.
* Customer booking history.
* Customer payment history.

Bookings

* Booking list.
* Booking details.
* Filter/search.
* Confirm booking.
* Request reschedule.
* Reject booking.
* Mark completed.
* Cancel booking where permitted.

Programs

* Create program.
* Edit program.
* Publish/unpublish program.
* Configure pricing.

Locations

* Create location.
* Edit location.
* Activate/deactivate location.

Payments

* Payment list.
* Payment details.
* Payment status visibility.

Verification

The administrator can manage the core customer-to-booking-to-payment workflow without relying on WhatsApp for routine administration.

⸻

12. Phase 8: Certificates

Goal

Create trustworthy digital certification records and public verification.

Tasks

* Create Certificate model.
* Define certificate numbering/identifier strategy.
* Connect certificates to customers.
* Record issue date.
* Record expiry where applicable.
* Record issuing organisation/instructor where applicable.
* Create digital certificate view.
* Create public verification page.
* Add QR code support if required.
* Restrict public verification data to appropriate information.

Important Rule

The platform must not claim accreditation, recognition, or certification authority that the organisation has not confirmed.

Verification

A valid certificate can be verified publicly using its unique identifier.

⸻

13. Phase 9: Online Learning

Goal

Add the educational platform after the core operational system is stable.

Tasks

Course catalogue

* Create Course model.
* Create course listing.
* Create course details.

Course structure

* Create modules.
* Create lessons.
* Support text/video/document content.
* Add assessments where required.

Enrollment

* Create course enrollment.
* Track lesson progress.
* Track course completion.

Customer experience

* Customer course dashboard.
* Course player.
* Progress indicators.
* Completion state.

Administration

* Course management.
* Module management.
* Lesson management.
* Enrollment visibility.
* Progress visibility.

Important Rule

Completing an online course must not automatically represent professional certification unless the organisation explicitly defines it that way.

⸻

14. Phase 10: Content, Notifications, and Product Polish

Goal

Improve the platform after the core workflows are working.

Tasks

* Content management where genuinely needed.
* Email notifications through Resend.
* Booking confirmation emails.
* Payment confirmation emails.
* Booking status emails.
* Course-related emails where useful.
* Certificate-related emails where useful.
* SEO improvements.
* Accessibility audit.
* Responsive/mobile refinement.
* Empty/loading/error state refinement.
* Form validation improvements.
* Performance improvements.
* Image/media optimization.

WhatsApp automation, SMS, advanced notification systems, and other integrations remain optional until there is a confirmed business need.

⸻

15. Phase 11: Testing, Deployment, and Launch

Goal

Prepare the platform for real organisational use.

Backend testing

* Authentication tests.
* Authorization tests.
* Validation tests.
* Booking tests.
* Pricing tests.
* Payment verification tests.
* Certificate verification tests.
* Booking state transition tests.

Frontend testing

* Authentication flows.
* Booking flow.
* Payment flow.
* Customer dashboard.
* Admin workflows.
* Responsive layouts.
* Error/loading/empty states.

End-to-end testing

At minimum verify:

Customer
  ↓
Register/Login
  ↓
Discover Program
  ↓
Create Booking
  ↓
Pay
  ↓
Payment Verified
  ↓
Booking Pending
  ↓
Admin Reviews
  ↓
Booking Confirmed

Deployment

* Configure production PostgreSQL.
* Deploy API.
* Deploy web application.
* Configure production environment variables.
* Configure Paystack production credentials.
* Configure email service.
* Configure media service.
* Configure allowed origins/CORS.
* Configure domain.
* Verify HTTPS.
* Run production smoke tests.

Launch readiness

* Confirm real organisation details.
* Confirm program catalogue.
* Confirm pricing.
* Confirm locations.
* Confirm payment/refund policy.
* Confirm certificate requirements.
* Confirm contact information.
* Confirm privacy/legal requirements.
* Remove demo/test content.
* Confirm admin access.
* Confirm backup/recovery approach.

⸻

16. MVP Boundary

The initial production MVP should focus on:

Public

* Home
* About
* Programs
* Program details
* Locations
* Contact
* FAQ
* Authentication

Customer

* Registration/login
* Profile
* Booking
* Payment
* Booking history
* Booking details
* Basic certificate view

Admin

* Dashboard
* Customers
* Programs
* Locations
* Bookings
* Payment visibility
* Certificates

Infrastructure

* Authentication
* PostgreSQL
* Prisma
* Express API
* Next.js frontend
* Paystack
* Basic email
* Responsive design
* Error/loading/empty states
* Security foundations

The full LMS, advanced content management, advanced reporting, complex notification automation, and other secondary capabilities should follow after the MVP is stable.

⸻

17. Business Decisions That Must Remain TBD

The development team must not invent answers for unresolved business questions.

These include:

* Final organisation name.
* Branding and logo.
* Exact program catalogue.
* Exact pricing.
* Pricing rules.
* Training curriculum.
* Accreditation relationships.
* Certificate requirements.
* Certificate expiry rules.
* Refund policy.
* Cancellation policy.
* Booking confirmation rules.
* Instructor information.
* Exact pool/location arrangements.
* Contact information.
* Legal/privacy requirements.
* Course content.
* Whether specific services are actually offered.

When one of these decisions blocks implementation, pause that specific feature and ask for confirmation rather than creating a permanent assumption.

⸻

18. Implementation Rule

Each roadmap item should normally become a small implementation task.

For example:

“Implement authentication”

should not become one giant coding request.

Instead:

1. Inspect current structure.
2. Create the User model.
3. Verify migration.
4. Create registration endpoint.
5. Test registration.
6. Create login endpoint.
7. Test login.
8. Add authentication middleware.
9. Test protected route.
10. Add frontend login.
11. Verify end-to-end flow.

The same incremental approach should be applied throughout the project.

⸻

19. Definition of Progress

Progress should be measured by working, verified functionality rather than the number of files created.

A phase is complete when:

* Its intended functionality works.
* Important business rules are enforced.
* Relevant errors are handled.
* Security requirements are satisfied.
* The UI works responsively where applicable.
* Tests or meaningful manual verification have been completed.
* No unnecessary functionality was introduced.
* Documentation remains consistent with the implementation.

⸻

20. Current Development Order

The recommended immediate sequence is:

Documentation
    ↓
Repository Setup
    ↓
Backend Foundation
    ↓
Frontend Foundation
    ↓
Authentication
    ↓
Programs + Locations
    ↓
Booking
    ↓
Payments
    ↓
Admin Operations
    ↓
Certificates
    ↓
LMS
    ↓
Polish + Notifications
    ↓
Testing + Deployment

The project should move through this sequence one small task at a time.