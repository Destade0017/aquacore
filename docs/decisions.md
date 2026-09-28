AquaCore Architecture & Product Decisions

1. Purpose

This document records important product, architecture, technical, and scope decisions made for the AquaCore project.

Its purpose is to prevent repeated debates, inconsistent implementation, and accidental changes to decisions that have already been established.

A decision recorded here should only be changed when new information or a deliberate project decision requires it.

Unconfirmed business information must remain marked as TBD rather than being converted into assumptions.

⸻

2. Decision Statuses

* Accepted: Confirmed and should be followed.
* TBD: Not yet confirmed and must not be invented.
* Proposed: A possible direction that still requires confirmation.

⸻

3. Product Decisions

D-001: Single-Organisation Platform

Status: Accepted

AquaCore is being built for one swimming/aquatic training organisation.

It is not a multi-tenant SaaS platform.

The architecture should not contain unnecessary tenant isolation, organisation switching, subscription management, or marketplace functionality.

⸻

D-002: Professional Digital Platform

Status: Accepted

The product is a complete digital platform for the organisation rather than a simple personal website.

It should support:

* Public organisation information.
* Program discovery.
* Customer accounts.
* Booking requests.
* Online payments.
* Customer dashboards.
* Administrative operations.
* Digital certificates.
* Certificate verification.
* Online learning as the platform develops.

The long-term product goal is for customers to discover the organisation, book services, pay online, learn where applicable, and manage their relationship with the organisation without relying on WhatsApp for every routine interaction.

⸻

D-003: Working Product Name

Status: TBD

The temporary working name is:

AquaCore

This name must not be treated as the final organisation name.

Branding, logo, colours, domain, and final naming remain subject to confirmation.

⸻

D-004: Abuja-Based Organisation

Status: Accepted

The organisation is being designed around operations in Abuja, Nigeria.

Specific locations, pools, training centres, and partner facilities remain configurable rather than hardcoded.

⸻

4. Product Experience Decisions

D-005: Reference Organisations

Status: Accepted

The following organisations are being used as product and experience references:

* American Lifeguard Association.
* American Red Cross Lifeguarding.
* Royal Life Saving Society UK.

They are references for areas such as:

* Professional presentation.
* Training discovery.
* Course presentation.
* Certification experiences.
* Booking flows.
* Educational content.
* Customer dashboards.
* Trust and safety communication.

Their branding, logos, proprietary content, assets, or exact visual designs must not be copied.

⸻

D-006: Professional Visual Direction

Status: Accepted

The platform should feel:

* Professional.
* Established.
* Trustworthy.
* Modern.
* Educational.
* Human.
* Aquatic without becoming gimmicky.

The interface should avoid looking like:

* A generic Bootstrap admin template.
* A cartoon swimming website.
* A generic SaaS landing page.
* An overly animated marketing site.
* An excessive glassmorphism design.
* An overly dark dashboard.
* A collection of oversized rounded cards.

The design system is defined in docs/design-system.md.

⸻

D-007: Mobile-First Customer Experience

Status: Accepted

Customer-facing workflows must work well on mobile devices.

This is particularly important for:

* Program discovery.
* Booking.
* Payment.
* Account access.
* Booking status.
* Course access.

Admin workflows should also be responsive where practical, although desktop usage is expected to be more common.

⸻

5. Architecture Decisions

D-008: Modular Monolith

Status: Accepted

The system will use a modular monolith architecture.

The project will initially consist of:

apps/
├── web/
└── api/
packages/
└── shared/

The system should not be split into microservices unless a genuine future requirement justifies it.

⸻

D-009: Next.js Frontend

Status: Accepted

The web application will use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

Next.js is responsible for the web experience, routing, rendering, public pages, dashboards, and frontend interactions.

⸻

D-010: Express Backend

Status: Accepted

The backend will use:

* Express
* TypeScript

The backend will expose a REST API under:

/api/v1

Express is intentionally being used instead of introducing a more complex backend framework.

⸻

D-011: PostgreSQL + Prisma

Status: Accepted

The primary database will be:

PostgreSQL

Database access and schema management will use:

Prisma

Database migrations must be used for schema changes.

⸻

D-012: Shared Package

Status: Accepted

A shared package may contain reusable types, schemas, or other genuinely shared code.

It should not become a dumping ground for unrelated application logic.

⸻

6. Authentication Decisions

D-013: JWT Authentication

Status: Accepted

Authentication will use JWT-based authentication.

Authentication tokens must be stored using secure HttpOnly cookies.

Tokens must not be stored in browser localStorage.

⸻

D-014: Roles

Status: Accepted

The initial role model is:

CUSTOMER
ADMIN

A more complex instructor/staff permission system is not required for the initial product.

Additional roles should only be introduced when an actual business requirement exists.

⸻

D-015: Backend Authoritative Authorization

Status: Accepted

The backend is responsible for determining whether a user is authorized to perform an action.

Hiding a button or route in the frontend is not considered authorization.

⸻

7. Booking Decisions

D-016: Request-Based Booking

Status: Accepted

Bookings are initially treated as requests, not guaranteed real-time reservations.

The customer provides:

* Program.
* Location.
* Preferred date.
* Preferred time.
* Participant information.

The booking is then reviewed by the organisation.

This avoids pretending that the platform knows real-time instructor or pool availability when it does not.

⸻

D-017: Booking Status Workflow

Status: Accepted

The initial booking lifecycle is:

PENDING
   ↓
CONFIRMED
   ↓
COMPLETED

Alternative paths include:

PENDING
   ↓
RESCHEDULE_REQUESTED
PENDING
   ↓
REJECTED
CONFIRMED
   ↓
CANCELLED

Additional payment/refund states may exist where required.

Invalid state transitions must be rejected by the backend.

⸻

D-018: No Automatic Confirmation

Status: Accepted

Successful payment does not automatically mean the lesson itself is confirmed.

Payment and booking confirmation are separate concepts.

The organisation must be able to review the request before confirming the booking.

⸻

8. Pricing Decisions

D-019: Configurable Pricing

Status: Accepted

Prices must not be permanently hardcoded into the frontend or booking logic.

Pricing may eventually depend on factors such as:

* Program.
* Lesson type.
* Private/group format.
* Number of participants.
* Number of sessions.
* Location.
* Duration.

The exact pricing rules remain subject to business confirmation.

⸻

D-020: Backend Calculates Final Price

Status: Accepted

The backend is authoritative for the final booking price.

The frontend may display an estimated or calculated amount, but the server must independently calculate and validate the amount before payment.

Monetary values should use integer minor units rather than floating-point arithmetic.

⸻

9. Payment Decisions

D-021: Paystack

Status: Accepted

Paystack will be used for online payments.

The integration should support:

* Transaction initialization.
* Payment reference generation.
* Customer checkout.
* Server-side verification.
* Payment status tracking.

⸻

D-022: Server-Side Payment Verification

Status: Accepted

The frontend must never be treated as proof of payment success.

The backend must verify the transaction with Paystack before recording the payment as successful.

Payment references must be unique and duplicate processing must be prevented.

⸻

D-023: Refund Rules

Status: TBD

The organisation’s refund and cancellation policies have not yet been confirmed.

The application must not invent a refund policy.

Until confirmed, refund behaviour should remain explicit and controlled rather than assuming automatic refunds.

⸻

10. Learning Decisions

D-024: LMS Is Part of the Product, Not the First Priority

Status: Accepted

Online learning is part of the planned platform but should follow the core operational workflow.

The initial system should first establish:

Organisation
→ Program
→ Booking
→ Payment
→ Administration

The LMS can then be added without destabilising the core booking system.

⸻

D-025: Course Structure

Status: Accepted

The planned educational structure is:

Course
   ↓
Module
   ↓
Lesson
   ↓
Assessment

Courses may contain:

* Text.
* Video.
* Images.
* Documents.
* Quizzes/assessments.

⸻

D-026: Online Completion Is Not Automatically Professional Certification

Status: Accepted

Completing an online course must not automatically represent professional certification.

Professional certification may require:

* Physical training.
* Practical assessment.
* Instructor assessment.
* Other requirements defined by the organisation.

The actual certification requirements remain subject to confirmation.

⸻

11. Certificate Decisions

D-027: Digital Certificates

Status: Accepted

The platform should support digital certificate records.

A certificate may contain:

* Certificate ID.
* Recipient.
* Course/training.
* Issue date.
* Expiry date where applicable.
* Issuing organisation.
* Instructor information where applicable.
* Verification information.

⸻

D-028: Public Certificate Verification

Status: Accepted

Certificates should have a public verification mechanism.

The public verification page should expose only information necessary to establish authenticity.

Sensitive customer information must not be unnecessarily exposed.

⸻

D-029: No Unverified Accreditation Claims

Status: Accepted

The platform must not claim that the organisation is accredited, certified, recognised, affiliated, or authorised by another organisation unless that relationship has been confirmed.

⸻

12. Media Decisions

D-030: External Media Storage

Status: Accepted

Images and other media should not unnecessarily be stored directly inside the application server.

A media service such as Cloudinary may be used.

Large video content should use an appropriate external media solution rather than unnecessarily increasing the application server’s storage responsibility.

⸻

13. Notification Decisions

D-031: Email First

Status: Accepted

Email will be the primary notification mechanism initially.

Resend is the planned email provider.

Potential notifications include:

* Account-related messages.
* Booking confirmations.
* Payment confirmations.
* Booking status updates.
* Course-related messages.
* Certificate-related messages.

⸻

D-032: WhatsApp Automation Is Not MVP

Status: Accepted

WhatsApp automation is intentionally outside the initial MVP.

The platform should reduce dependence on WhatsApp through proper workflows rather than immediately trying to automate every WhatsApp interaction.

⸻

14. Deployment Decisions

D-033: Web Deployment

Status: Accepted

The Next.js application is intended to be deployed using Vercel.

⸻

D-034: API Deployment

Status: Accepted

The Express API may be deployed using a platform such as Render or Railway.

The final provider can be confirmed during deployment.

⸻

D-035: Managed PostgreSQL

Status: Accepted

Production PostgreSQL should use a managed database service.

The application should not depend on a manually maintained production database server for the initial deployment.

⸻

15. Security Decisions

D-036: Secure-by-Default

Status: Accepted

Security is a core product requirement rather than a later polish task.

The system must include:

* Secure password hashing.
* HttpOnly cookies.
* Authorization checks.
* Input validation.
* Ownership checks.
* Secure environment variables.
* Explicit CORS configuration.
* Safe error handling.
* No secrets in source control.
* No unnecessary PII in logs.
* Server-side payment verification.

⸻

D-037: Backend Business Authority

Status: Accepted

The backend is the source of truth for:

* Authentication.
* Authorization.
* Pricing.
* Booking status.
* Payment status.
* Ownership.
* Enrollment.
* Certificate issuance.

The frontend should never be trusted to enforce business rules by itself.

⸻

16. Scope Decisions

D-038: No Multi-Tenant SaaS

Status: Accepted

The platform will not include:

* Organisation switching.
* Tenant-specific databases.
* SaaS subscription plans.
* Tenant billing.
* Marketplace organisation accounts.

⸻

D-039: No Native Mobile App Initially

Status: Accepted

The initial product is a responsive web application.

Native iOS or Android applications are outside the current scope.

⸻

D-040: No Microservices

Status: Accepted

The initial system will not use microservices.

There is no current requirement for:

* Kubernetes.
* Distributed services.
* Complex message queues.
* Distributed caching.
* Real-time infrastructure.

These should only be introduced if a real requirement emerges.

⸻

D-041: No Complex Instructor System Initially

Status: Accepted

The first version does not require separate instructor accounts, instructor scheduling, or complex instructor management.

The organisation’s administrator can manage the initial workflow.

A dedicated instructor system can be introduced later if the organisation requires it.

⸻

D-042: No AI Features in the Core MVP

Status: Accepted

AI chatbots, AI training plans, AI recommendations, and similar functionality are not part of the core MVP.

AI should only be introduced later when there is a clear business problem it solves.

⸻

17. Content Decisions

D-043: No Invented Business Information

Status: Accepted

The development team must not invent:

* Prices.
* Accreditations.
* Partnerships.
* Instructor qualifications.
* Testimonials.
* Statistics.
* Awards.
* Course claims.
* Locations.
* Policies.
* Certifications.

Where information is unavailable, use appropriate placeholder/TBD treatment during development.

⸻

D-044: Trust Content Must Be Verifiable

Status: Accepted

Trust-building content should be based on information the organisation can substantiate.

The website must not manufacture credibility through fake reviews, fake statistics, fake affiliations, or invented certification claims.

⸻

18. Development Decisions

D-045: Incremental Development

Status: Accepted

The project will be developed in small, focused tasks.

A request such as:

“Build the booking system”

should be broken into smaller implementation steps.

Each step should be:

* Understandable.
* Testable.
* Reviewable.
* Reversible where practical.

⸻

D-046: Inspect Before Modifying

Status: Accepted

Before changing existing code, the developer or coding agent should inspect the relevant implementation.

It should not assume that files, architecture, APIs, or patterns exist without checking.

⸻

D-047: Preserve Working Functionality

Status: Accepted

Changes should not unnecessarily modify unrelated systems.

When implementing a feature, preserve existing:

* API behaviour.
* Authentication.
* Authorization.
* Business rules.
* Database behaviour.
* UI patterns.

unless the task explicitly requires a change.

⸻

D-048: No Scope Creep

Status: Accepted

A task should implement the requested change and the minimum supporting work required for it.

Unrelated improvements should not be bundled into the same task simply because they appear convenient.

⸻

19. Decisions Still Requiring Business Confirmation

The following are deliberately unresolved:

Area	Decision
Final organisation name	TBD
Logo/brand identity	TBD
Exact programs	TBD
Exact pricing	TBD
Pricing rules	TBD
Locations	TBD
Pool partnerships	TBD
Instructor information	TBD
Accreditation relationships	TBD
Certificate requirements	TBD
Certificate expiry rules	TBD
Refund policy	TBD
Cancellation policy	TBD
Booking confirmation policy	TBD
Course curriculum	TBD
Course content	TBD
Legal/privacy requirements	TBD
Final contact information	TBD

These items should be confirmed with the organisation before they become permanent application behaviour or public-facing claims.

⸻

20. Decision Change Rule

A recorded decision should not be silently changed.

When a major decision changes:

1. Identify the affected decision.
2. Explain why the previous decision no longer applies.
3. Update this document.
4. Update any affected architecture/product documentation.
5. Identify implementation that must change.
6. Verify that the new decision does not conflict with the guardrails.

The goal is not to prevent change.

The goal is to make important change deliberate and traceable.

⸻

21. Current Architectural Baseline

Unless a documented decision changes it, the current baseline is:

                    ┌─────────────────────┐
                    │     Next.js Web     │
                    │                     │
                    │ Public / Customer   │
                    │ / Admin Experience   │
                    └──────────┬──────────┘
                               │
                         REST / HTTPS
                               │
                    ┌──────────▼──────────┐
                    │    Express API      │
                    │                     │
                    │ Auth / Bookings     │
                    │ Payments / Courses  │
                    │ Certificates / etc. │
                    └──────────┬──────────┘
                               │
                            Prisma
                               │
                    ┌──────────▼──────────┐
                    │     PostgreSQL      │
                    └─────────────────────┘
External services:
- Paystack
- Resend
- Cloudinary or equivalent

This is a modular monolith, not a collection of independent services.

⸻

22. Final Principle

AquaCore should remain:

Simple enough to build, professional enough to use, secure enough to trust, and flexible enough to grow.

When a requirement can be solved with a simple, maintainable implementation, prefer that over unnecessary technical complexity.