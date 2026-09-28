Architecture & Technical Design

1. Purpose

This document defines the technical architecture, technology choices, system boundaries, development conventions, and implementation principles for the AquaCore platform.

It complements PRD.md.

PRD.md defines what the product should do.

AND.md defines how the product should be built.

If a technical decision conflicts with a confirmed product requirement, the product requirement takes precedence.

⸻

2. Architecture Overview

The application will use a modular monolith architecture consisting of two primary applications:

┌─────────────────────────────────────────────┐
│                  WEB APP                    │
│          Next.js + TypeScript               │
│                                             │
│  Public Website                             │
│  Customer Dashboard                         │
│  Admin Dashboard                            │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTPS / REST API
                       ▼
┌─────────────────────────────────────────────┐
│                  API                        │
│          Express + TypeScript               │
│                                             │
│  Authentication                             │
│  Users                                      │
│  Programs                                   │
│  Bookings                                   │
│  Payments                                   │
│  Courses                                    │
│  Certificates                               │
│  Locations                                  │
│  Content                                    │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              PostgreSQL                     │
│               Prisma                        │
└─────────────────────────────────────────────┘

External services:

                 ┌───────────────┐
                 │    Paystack   │
                 └───────┬───────┘
                         │
                         ▼
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│   Next.js   │────▶│   Express   │────▶│ PostgreSQL   │
└─────────────┘     └──────┬──────┘     └──────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
         Cloudinary       Resend       Other APIs

⸻

3. Technology Stack

Frontend

Next.js

Use the current stable Next.js release available at project initialization.

Primary responsibilities:

* Public website
* SEO
* Routing
* Customer UI
* Admin UI
* Server-rendered public content where appropriate
* Client-side interactivity where required

TypeScript

Strict TypeScript should be enabled.

Avoid any unless there is a documented technical reason.

⸻

UI

Tailwind CSS

Used for styling and responsive design.

shadcn/ui

Use shadcn/ui as a foundation for reusable interface primitives where appropriate.

Components should be adapted to the project’s design system rather than used blindly with default styling.

⸻

4. Backend

Express

The backend will use Express with TypeScript.

Express is responsible for:

* REST API
* Authentication
* Authorization
* Business logic
* Database interaction
* Payment integration
* Course logic
* Certificate logic
* Booking logic
* Validation
* External service integrations

The frontend must not contain authoritative business logic that belongs on the backend.

⸻

5. Database

PostgreSQL

PostgreSQL is the primary database.

Reasons:

* Strong relational modelling
* Suitable for bookings
* Suitable for payments
* Suitable for users and permissions
* Suitable for courses and learning progress
* Suitable for certificate records
* Strong transactional guarantees
* Mature ecosystem

⸻

6. ORM

Prisma

Prisma will be used for database access and schema management.

Prisma responsibilities:

* Database schema
* Migrations
* Type-safe queries
* Relationships
* Transactions where appropriate

Database access should be centralised through the backend.

The frontend must never connect directly to PostgreSQL.

⸻

7. Repository Structure

The preferred repository structure is:

aquacore/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── hooks/
│   │   └── ...
│   │
│   └── api/
│       └── src/
│           ├── modules/
│           ├── middleware/
│           ├── lib/
│           ├── config/
│           ├── routes/
│           └── ...
│
├── packages/
│   └── shared/
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docs/
│
├── PRD.md
├── AND.md
├── AGENTS.md
├── GUARDRAILS.md
└── README.md

If a simpler repository structure is technically more appropriate during implementation, the agent may propose it before changing the architecture.

⸻

8. Frontend Architecture

The Next.js application should separate:

Public

/
 /about
 /programs
 /programs/[slug]
 /courses
 /courses/[slug]
 /locations
 /certificates
 /certificates/verify/[id]
 /contact
 /faq

Authentication

/auth/login
/auth/register
/auth/forgot-password
/auth/reset-password

Customer

/dashboard
/dashboard/bookings
/dashboard/bookings/[id]
/dashboard/courses
/dashboard/courses/[id]
/dashboard/certificates
/dashboard/payments
/dashboard/profile

Admin

/admin
/admin/customers
/admin/customers/[id]
/admin/bookings
/admin/bookings/[id]
/admin/programs
/admin/programs/[id]
/admin/courses
/admin/courses/[id]
/admin/locations
/admin/payments
/admin/certificates
/admin/content
/admin/settings

Exact route naming may change during implementation if there is a strong technical reason.

⸻

9. Backend Module Architecture

The Express application should be organised by business domain.

Preferred structure:

src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── programs/
│   ├── bookings/
│   ├── payments/
│   ├── courses/
│   ├── certificates/
│   ├── locations/
│   ├── content/
│   └── notifications/
│
├── middleware/
├── lib/
├── config/
├── routes/
├── app.ts
└── server.ts

Each module should contain its own relevant:

* Routes
* Controllers
* Services
* Validation schemas
* Types
* Business logic

Example:

modules/bookings/
├── booking.routes.ts
├── booking.controller.ts
├── booking.service.ts
├── booking.schema.ts
└── booking.types.ts

Do not create unnecessary layers where they add no value.

⸻

10. API Architecture

The backend will expose a versioned REST API.

Preferred base:

/api/v1

Examples:

GET    /api/v1/programs
GET    /api/v1/programs/:id
POST   /api/v1/bookings
GET    /api/v1/bookings
GET    /api/v1/bookings/:id
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/courses
GET    /api/v1/courses/:id
GET    /api/v1/certificates/:id

Admin endpoints should be protected by authentication and authorization middleware.

⸻

11. API Responsibilities

The API is the authoritative source for:

* Authentication
* Authorization
* Business rules
* Booking status
* Payment status
* Pricing calculations
* Course enrolment
* Certificate issuance
* User ownership checks
* Administrative permissions

The frontend may display and collect information, but it must not be trusted to enforce business rules.

⸻

12. Authentication Architecture

The system will support:

* Customer authentication
* Admin authentication

Authentication should use secure server-managed sessions or secure token-based authentication.

For the initial architecture, authentication should use:

JWT-based authentication stored in secure HttpOnly cookies.

Important requirements:

* Tokens must not be stored in localStorage.
* Cookies should use HttpOnly.
* Cookies should use Secure in production.
* Appropriate SameSite policy must be configured.
* Token expiration must be enforced.
* Logout must invalidate the appropriate session/token mechanism.

If refresh tokens are implemented, they must be securely managed and revocable.

⸻

13. Authorization

Authorization must be enforced on the backend.

Initial roles:

CUSTOMER
ADMIN

Example:

CUSTOMER
  ├── Read own profile
  ├── Read own bookings
  ├── Create bookings
  ├── Read own payments
  ├── Read enrolled courses
  └── Read own certificates
ADMIN
  └── Organisation-wide management

A customer must never be able to access another customer’s:

* Booking
* Payment
* Course progress
* Certificate
* Personal information

Simply hiding UI elements is not sufficient authorization.

⸻

14. Database Domain Model

The database should eventually contain entities broadly corresponding to:

User
Program
Location
Booking
BookingParticipant
Payment
Course
CourseModule
Lesson
CourseEnrollment
LessonProgress
Assessment
Certificate
Notification
Content

The exact Prisma schema should be designed during implementation rather than blindly copied from this conceptual model.

⸻

15. User Model

The user model should support:

* ID
* Name
* Email
* Phone
* Password hash
* Role
* Account status
* Created date
* Updated date

Additional profile information should be added only when required.

Do not collect unnecessary personal data.

⸻

16. Program Model

A program should support configurable:

* Name
* Slug
* Description
* Category
* Price configuration
* Duration
* Requirements
* Status
* Images
* Location relationships

Programs should be data-driven.

The application should not require a code deployment simply to add a new swimming program.

⸻

17. Location Model

Locations should be managed by the admin.

A location may contain:

* Name
* Type
* Address
* Description
* Contact details
* Facilities
* Status
* Images

The system should support many locations.

⸻

18. Booking Architecture

A booking should reference:

Customer
Program
Location
Participant(s)
Payment
Booking status
Preferred date
Preferred time

The booking system is intentionally request-based in the MVP.

The customer does not reserve a guaranteed physical slot.

Instead:

Customer submits request
        ↓
Payment succeeds
        ↓
Booking becomes pending
        ↓
Admin reviews
        ↓
Admin confirms/reschedules/rejects

The system should clearly communicate this distinction to users.

⸻

19. Booking State Machine

The booking system should use explicit status transitions.

Conceptually:

PENDING
   │
   ├── CONFIRMED
   │
   ├── RESCHEDULE_REQUESTED
   │
   ├── REJECTED
   │
   └── CANCELLED
CONFIRMED
   │
   ├── COMPLETED
   └── CANCELLED

Invalid transitions should be rejected by the backend.

The final state machine may be refined during implementation.

⸻

20. Payment Architecture

Paystack integration must be handled server-side.

Basic flow:

Customer submits booking
        ↓
Backend calculates price
        ↓
Backend creates payment reference
        ↓
Frontend opens Paystack checkout
        ↓
Customer pays
        ↓
Paystack processes payment
        ↓
Backend verifies transaction
        ↓
Payment marked successful
        ↓
Booking marked paid/pending confirmation

The backend must verify payment independently.

The frontend must never be trusted to declare a transaction successful.

⸻

21. Pricing Architecture

Pricing must be calculated by the backend.

The client may display an estimated price, but the final amount must be determined by the server.

This protects against:

* Client-side price manipulation
* Tampered requests
* Incorrect totals

Pricing should be represented using integer minor currency units where appropriate rather than floating-point arithmetic.

For Nigerian Naira, monetary calculations should avoid JavaScript floating-point errors.

⸻

22. Course Architecture

The learning system should support:

Course
 ├── Module
 │    ├── Lesson
 │    ├── Lesson
 │    └── Lesson
 │
 ├── Module
 │
 └── Assessment

Student learning:

Course Enrollment
      ↓
Module
      ↓
Lesson
      ↓
Progress
      ↓
Assessment

The initial implementation may use placeholder content.

⸻

23. Certificate Architecture

Certificates should be treated as records in the database.

Each certificate should have a unique verification identifier.

Conceptually:

Certificate
├── Student
├── Course/Program
├── Certificate ID
├── Issue Date
├── Expiry Date
├── Status
└── Verification Data

Public verification should expose only information that is appropriate to disclose.

Sensitive student information must not be exposed through certificate verification.

⸻

24. File and Media Storage

Media such as:

* Program images
* Course images
* Course videos
* Certificate assets
* Organisation images

should not be stored directly inside the application repository.

Cloudinary or an equivalent managed media-storage provider should be used.

Large video storage and delivery requirements should be evaluated before committing to Cloudinary for the final learning platform.

⸻

25. Email

Resend will be the initial email provider.

Email functionality should be isolated behind a notification/email service so the provider can be replaced later.

Potential emails:

* Welcome/account confirmation
* Password reset
* Booking received
* Payment confirmation
* Booking confirmation
* Rescheduling notification
* Cancellation
* Course enrolment
* Certificate issued

⸻

26. Shared Types and Validation

Where practical, shared schemas/types may live in:

packages/shared

Zod should be used for request validation.

Validation should occur:

1. At the API boundary
2. Where appropriate in frontend forms

Frontend validation improves user experience.

Backend validation provides actual security.

⸻

27. Error Handling

The API should use a consistent error response format.

Conceptually:

{
  "success": false,
  "error": {
    "code": "BOOKING_NOT_FOUND",
    "message": "Booking could not be found."
  }
}

Internal stack traces and sensitive implementation details must not be returned to production clients.

Errors should be logged appropriately on the server.

⸻

28. Logging

The backend should use structured logging where practical.

Logs should help diagnose:

* Authentication issues
* Payment failures
* Booking failures
* Unexpected server errors
* External service failures

Sensitive information must not be logged.

Never log:

* Passwords
* Authentication tokens
* Payment secrets
* Full sensitive personal information

⸻

29. Security Architecture

Security must be treated as a core requirement.

Required principles:

* Secure password hashing
* Input validation
* Authentication
* Backend authorization
* Rate limiting
* Secure cookies
* CORS configuration
* Security headers
* Environment secrets
* Payment verification
* Ownership checks
* Safe error handling

The application must follow least-privilege principles.

⸻

30. CORS

The Express API should explicitly allow the known frontend origin(s).

Do not use unrestricted:

Access-Control-Allow-Origin: *

when authenticated credentialed requests are involved.

Production origins should be configured through environment variables.

⸻

31. Environment Configuration

Secrets must be stored in environment variables.

Examples:

DATABASE_URL
JWT_SECRET
PAYSTACK_SECRET_KEY
PAYSTACK_PUBLIC_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RESEND_API_KEY
WEB_APP_URL
API_URL

No secret should be committed to Git.

A safe .env.example file should document required variables without containing real secrets.

⸻

32. Deployment

Initial deployment target:

Web

Vercel or equivalent Next.js-compatible hosting.

API

Render, Railway, or another reliable Node.js hosting provider.

Database

Managed PostgreSQL.

The exact provider can be selected during implementation based on:

* Cost
* Reliability
* Nigerian/international access
* Database performance
* Deployment simplicity

The architecture must not depend on one provider’s proprietary features unless justified.

⸻

33. Development Environments

The project should support:

Development
Staging/Preview
Production

At minimum, development and production must use separate credentials and databases.

Production data must never be used casually during local development.

⸻

34. Database Migrations

Prisma migrations must be used for schema changes.

Database schema changes should:

1. Be intentional
2. Be reviewed
3. Be tested
4. Avoid destructive operations unless explicitly approved
5. Preserve existing production data where possible

Never casually reset a production database.

⸻

35. Seed Data

Development seed data may be provided for:

* Temporary admin
* Example programs
* Example locations
* Example customers
* Example bookings
* Example courses
* Example certificates

Seed data must be clearly identified as development/demo data.

Production must not accidentally contain fake analytics or fake customer records.

⸻

36. Frontend Data Fetching

The frontend should communicate with the Express API through a clear API client layer.

Avoid scattering raw fetch() calls throughout components.

Prefer a structured approach such as:

lib/api/
├── auth.ts
├── bookings.ts
├── programs.ts
├── courses.ts
├── certificates.ts
└── payments.ts

The exact implementation may use a suitable data-fetching library if complexity justifies it.

Do not introduce React Query/TanStack Query solely because it is popular. Use it when the application genuinely benefits from client-side server-state management.

⸻

37. State Management

Avoid global state by default.

Use:

* Local React state for local UI
* Server data fetching for server state
* URL state for filters/search where appropriate
* Context only for genuinely global client concerns

A large global state store should not be introduced unless actual complexity requires it.

⸻

38. SEO Architecture

Public pages should use Next.js SEO capabilities.

Important public pages should have:

* Metadata
* Canonical URLs where appropriate
* Open Graph information
* Semantic structure
* Structured content
* Sitemap
* Robots configuration

Authenticated dashboard routes should not be indexed.

⸻

39. Accessibility

The interface should follow accessible web practices.

Requirements include:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Appropriate labels
* Accessible forms
* Sufficient contrast
* Descriptive buttons
* Meaningful error messages
* Alt text for meaningful images

Do not rely solely on colour to communicate state.

⸻

40. Responsive Architecture

The UI must be responsive from the beginning.

Do not treat mobile support as a final polishing step.

Primary breakpoints should be established in the design system.

The booking flow should be tested heavily at mobile widths.

⸻

41. Design System

A central design system should be established before building many pages.

It should define:

* Typography
* Colours
* Spacing
* Radius
* Shadows
* Buttons
* Inputs
* Cards
* Tables
* Badges
* Modals
* Navigation
* Sidebar
* Empty states
* Loading states
* Error states

The design system should be documented separately in:

docs/design-system.md

⸻

42. Admin Dashboard Architecture

The admin dashboard should use a consistent application shell.

┌──────────────────────────────────────────────┐
│ Header                                       │
├──────────────┬───────────────────────────────┤
│              │                               │
│ Sidebar      │ Main Content                  │
│              │                               │
│ Dashboard    │                               │
│ Bookings     │                               │
│ Customers    │                               │
│ Programs     │                               │
│ Courses      │                               │
│ Locations    │                               │
│ Payments     │                               │
│ Certificates │                               │
│ Content      │                               │
│ Settings     │                               │
│              │                               │
└──────────────┴───────────────────────────────┘

The dashboard should prioritise operational clarity rather than attempting to replicate the public website.

⸻

43. Public Website Architecture

The public website should prioritise:

1. Trust
2. Clear program discovery
3. Strong calls to action
4. Mobile usability
5. SEO
6. Professional presentation

Primary CTA examples:

* Book a Lesson
* Explore Programs
* Find a Course
* Start Training
* Contact Us

The exact copy will be established during UI implementation.

⸻

44. Testing Strategy

Testing should be incremental.

Backend

Test:

* Authentication
* Authorization
* Validation
* Booking logic
* Pricing
* Payment verification
* Certificate verification
* Important state transitions

Frontend

Test:

* Forms
* Navigation
* Booking flow
* Authentication states
* Responsive behaviour
* Error states

Integration

Important flows should eventually be tested end-to-end:

Register
→ Login
→ Select Program
→ Submit Booking
→ Pay
→ Booking Appears
→ Admin Confirms

⸻

45. Observability

The initial system should have enough logging and error reporting to identify failures.

A dedicated external observability platform may be added later if required.

Do not introduce complex monitoring infrastructure during initial development without need.

⸻

46. Scalability Philosophy

The system should be designed to scale reasonably, but not prematurely.

The initial architecture should comfortably support the organisation’s expected usage without requiring:

* Microservices
* Kubernetes
* Message queues
* Distributed caching
* Event-driven infrastructure

These should only be introduced when actual requirements justify them.

⸻

47. Architecture Principles

Principle 1: Modular monolith first

Keep business domains separated within one backend application.

Principle 2: Backend owns business logic

Never trust the client with authoritative business decisions.

Principle 3: Data-driven product

Programs, locations, pricing, courses, and certificates should be stored as data.

Principle 4: Secure by default

Security is part of implementation, not a final checklist.

Principle 5: Small changes

Changes should be incremental and verifiable.

Principle 6: No speculative infrastructure

Do not add technology without a demonstrated requirement.

Principle 7: Replaceable integrations

External providers should be isolated behind service boundaries where practical.

Principle 8: Keep complexity proportional to the organisation

Build what the organisation needs now while leaving sensible room for growth.

⸻

48. Architectural Boundaries

The following boundaries should remain clear:

Next.js
    ↓
HTTP/API
    ↓
Express
    ↓
Business Logic
    ↓
Prisma
    ↓
PostgreSQL

External integrations should be accessed by the backend:

Express
 ├── Paystack
 ├── Cloudinary
 └── Resend

The browser must never directly access secret credentials.

⸻

49. Initial Dependency Philosophy

Dependencies should be added only when they solve a real problem.

Before introducing a new package, the developer should ask:

1. Is it actually necessary?
2. Can the existing stack handle this?
3. Is the package maintained?
4. Does it significantly increase complexity?
5. Does it overlap with an existing dependency?

Avoid dependency bloat.

⸻

50. Technical Decision Record

Major architectural decisions should be recorded in:

docs/decisions.md

Examples:

* Why Express was selected
* Why PostgreSQL was selected
* Why the system uses a modular monolith
* Why booking availability is manual in MVP
* Why Paystack was selected
* Why online certification is separated from physical certification

Future changes should document the reason rather than silently changing architecture.

⸻

51. Current Technology Decision

The current approved stack is:

Frontend:
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Backend:
Node.js
Express
TypeScript
Database:
PostgreSQL
Prisma
Payments:
Paystack
Media:
Cloudinary or equivalent
Email:
Resend
Authentication:
JWT + secure HttpOnly cookies
Architecture:
Modular monolith

This stack remains subject to revision if implementation reveals a strong technical reason.

Any significant change should be documented before implementation.

⸻

52. Implementation Rule

Technical architecture should support the product rather than dictate unnecessary product complexity.

When uncertain:

Prefer the simplest solution
that satisfies the requirement
and preserves reasonable future flexibility.

Do not build infrastructure for hypothetical scale.

Do not build features simply because the technology makes them possible.

Do not sacrifice maintainability for cleverness.