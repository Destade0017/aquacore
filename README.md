AquaCore

Professional digital platform for a swimming and aquatic training organisation.

AquaCore combines a public-facing website, program discovery, customer bookings, online payments, educational courses, digital certificates, and an administrative management dashboard in one system.

Status: In active development
Organisation: Single-organisation platform
Working name: AquaCore

⸻

1. What AquaCore Does

AquaCore is designed to allow customers to:

* Discover swimming and aquatic training programs
* Learn about available locations
* Create an account
* Request swimming lessons or training
* Select a preferred date and time
* Pay online
* Track bookings
* Access educational courses
* Track course progress
* View certificates
* Verify certificates publicly

The organisation administrator can:

* Manage customers
* Manage programs
* Manage locations
* Manage bookings
* Review payments
* Manage courses
* Manage certificates
* Manage website content
* Monitor activity from an admin dashboard

The long-term goal is to reduce the organisation’s dependence on manual WhatsApp-based processes.

⸻

2. Product Scope

AquaCore is not a SaaS product.

It is built specifically for one swimming/aquatic training organisation.

The current product does not include:

* Multi-tenant organisations
* Organisation subscriptions
* Marketplace functionality
* Third-party organisation accounts
* Native mobile applications
* Complex instructor management
* AI chatbot functionality
* WhatsApp automation
* Complex real-time scheduling infrastructure

These may only be considered if the product requirements are explicitly changed.

⸻

3. Inspiration

The product experience takes inspiration from established aquatic and lifesaving organisations, including:

* American Lifeguard Association
* American Red Cross Lifeguarding
* Royal Life Saving Society UK

These references influence the product’s:

* Professional presentation
* Information architecture
* Training/course organisation
* Certification experience
* Educational content
* Trust-focused design
* User journeys

AquaCore does not copy their branding, logos, proprietary content, imagery, or exact visual designs.

⸻

4. Technology Stack

Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

Backend

* Express
* TypeScript
* REST API

Database

* PostgreSQL
* Prisma ORM

Authentication

* JWT
* Secure HttpOnly cookies

Payments

* Paystack

Media

* Cloudinary or approved equivalent

Email

* Resend

Deployment

* Vercel for the web application
* Render/Railway or equivalent for the API
* Managed PostgreSQL

⸻

5. Architecture

AquaCore uses a modular monolith architecture.

                    ┌──────────────────────┐
                    │      Customers       │
                    │   Web Browser/App    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Next.js Web      │
                    │    apps/web           │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express API       │
                    │     apps/api         │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       ┌───────────┐     ┌───────────┐    ┌────────────┐
       │ PostgreSQL│     │ Paystack  │    │  External  │
       │  + Prisma │     │           │    │  Services  │
       └───────────┘     └───────────┘    │ Media/Email│
                                           └────────────┘

The system is intentionally kept simple.

Microservices and distributed infrastructure are not part of the current architecture.

⸻

6. Repository Structure

aquacore/
│
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # Express backend
│
├── packages/
│   └── shared/              # Shared types/schemas where useful
│
├── prisma/                  # Prisma schema and migrations
│
├── docs/                    # Project documentation
│
├── PRD.md                   # Product requirements
├── AND.md                   # Architecture and technical decisions
├── AGENTS.md                # AI/developer working instructions
├── GUARDRAILS.md            # Security and development guardrails
└── README.md                # Project overview

The exact structure may evolve as implementation progresses.

Changes should remain consistent with the architecture documents.

⸻

7. Application Areas

Public Website

Expected public areas include:

* Home
* About
* Programs
* Program details
* Courses
* Course details
* Locations
* Certifications
* Certificate verification
* FAQs
* Contact

⸻

Customer Dashboard

Customers may have access to:

* Dashboard overview
* Profile
* Bookings
* Booking details
* Payments
* Courses
* Course progress
* Certificates
* Notifications

⸻

Admin Dashboard

The administrator may manage:

* Dashboard overview
* Customers
* Customer details
* Bookings
* Programs
* Courses
* Locations
* Payments
* Certificates
* Website content
* Settings

⸻

8. Booking Flow

The initial booking model is request-based.

Customer
   │
   ▼
Select Program
   │
   ▼
Select Location
   │
   ▼
Choose Preferred Date/Time
   │
   ▼
Enter Participant Information
   │
   ▼
Review Price
   │
   ▼
Pay Through Paystack
   │
   ▼
Payment Verified
   │
   ▼
Booking Pending
   │
   ▼
Admin Reviews
   │
   ├───────────────┐
   ▼               ▼
Confirmed      Reschedule
   │               │
   ▼               ▼
Training       New Date/Time

A customer’s preferred date and time are not automatically guaranteed.

The administrator confirms availability.

⸻

9. Booking Statuses

The system may use:

PENDING
CONFIRMED
RESCHEDULE_REQUESTED
COMPLETED
CANCELLED
REJECTED
REFUND_PENDING
REFUNDED

Valid state transitions are enforced by the backend.

⸻

10. Payment Flow

Paystack handles payment processing.

AquaCore remains responsible for verifying the transaction server-side.

Booking Created
      ↓
Backend Calculates Amount
      ↓
Payment Reference Created
      ↓
Customer Pays
      ↓
Transaction Verified
      ↓
Payment Recorded
      ↓
Booking Remains Pending
      ↓
Admin Confirms Booking

The browser is never the authority for payment success.

⸻

11. Learning and Certification

Online learning follows a structure similar to:

Course
│
├── Module
│   ├── Lesson
│   ├── Lesson
│   └── Assessment
│
├── Module
│   ├── Lesson
│   └── Lesson
│
└── Assessment

Course completion and professional certification are separate concepts.

A completed online course does not automatically imply professional certification unless the organisation explicitly defines that relationship.

⸻

12. Certificate Verification

Certificates use unique verification identifiers.

A public verification page allows someone to check whether a certificate record is valid.

The verification system should expose only appropriate public information.

It must not expose unnecessary private customer data.

⸻

13. Development Principles

AquaCore follows these principles:

Build incrementally

Small features are easier to understand, test, debug, and improve.

Keep the backend authoritative

Important business rules belong on the server.

Prefer configuration over hardcoding

Prices, programs, locations, and other business information should be manageable rather than scattered throughout the codebase.

Keep complexity low

Do not introduce infrastructure that the product does not currently need.

Preserve working functionality

New features should not unnecessarily break existing functionality.

Validate before trusting

Never assume frontend input is safe or correct.

Mobile matters

The public customer journey must work well on mobile devices.

Professional over flashy

The product should feel trustworthy and established rather than overloaded with visual effects.

⸻

14. Documentation

Important project documents:

Document	Purpose
PRD.md	Product requirements and scope
AND.md	Architecture and technical decisions
AGENTS.md	Development and AI-agent instructions
GUARDRAILS.md	Security and development boundaries
README.md	Repository overview
docs/decisions.md	Major architecture/product decisions
docs/roadmap.md	Development roadmap
docs/design-system.md	Visual and UI system

When requirements or architecture change, update the appropriate documentation deliberately.

⸻

15. Development Workflow

Development should generally follow:

Requirement
    ↓
Understand
    ↓
Inspect Existing Code
    ↓
Plan Small Change
    ↓
Implement
    ↓
Test
    ↓
Verify
    ↓
Document if Necessary
    ↓
Stop

Do not combine unrelated features into one task.

⸻

16. Environment Variables

Environment variables are required for local development.

Expected configuration may include:

DATABASE_URL=
JWT_SECRET=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
WEB_APP_URL=
API_URL=

Actual environment files containing secrets must never be committed.

The exact variables may change as implementation progresses.

⸻

17. Local Development

Once the project has been initialized, the expected development setup will generally involve:

Install dependencies

npm install

Start the web application

npm run dev

Start the API

npm run dev

The exact commands depend on the final workspace configuration.

Do not assume these commands are available until the corresponding scripts have been implemented.

⸻

18. Database Development

Prisma is used for database access.

Typical development operations may include:

npx prisma generate
npx prisma migrate dev
npx prisma studio

Use migrations for schema changes.

Do not manually modify production databases unless the appropriate migration/release process requires it.

⸻

19. Testing

Testing priorities include:

Backend

* Authentication
* Authorization
* Input validation
* Customer ownership
* Booking creation
* Booking status transitions
* Pricing
* Payment verification
* Certificate verification

Frontend

* Forms
* Navigation
* Loading states
* Error states
* Responsive layouts
* Booking flow
* Customer dashboard
* Admin workflows

The core customer journey should eventually be covered end-to-end.

⸻

20. Security

Security requirements are defined in:

GUARDRAILS.md

Important principles include:

* No authentication tokens in localStorage
* Server-side authorization
* Server-side payment verification
* Validated API input
* Secure cookies
* No committed secrets
* No unnecessary personal data exposure
* Explicit CORS configuration
* Secure file handling

⸻

21. Current Development Status

The project is being developed incrementally.

The following foundational documents should be established before substantial feature implementation:

* PRD.md
* AND.md
* AGENTS.md
* GUARDRAILS.md
* README.md
* docs/design-system.md
* docs/roadmap.md
* docs/decisions.md

Implementation should begin only after the foundation and development direction are sufficiently clear.

⸻

22. Important Product Unknowns

Some business information is intentionally unresolved.

Examples:

* Final organisation name
* Final logo
* Brand identity
* Exact programs
* Final pricing
* Refund policy
* Certification/accreditation relationships
* Certificate requirements
* Course curriculum
* Instructor information
* Contact information
* Legal/privacy requirements

Do not invent permanent answers to these questions.

The system should remain flexible enough for the organisation to provide the final information later.

⸻

23. Definition of Success

AquaCore succeeds when a customer can:

1. Discover the organisation
2. Understand available programs
3. Choose a program
4. Select a preferred location
5. Request a date and time
6. Provide participant information
7. Pay online
8. Receive payment confirmation
9. Track the booking
10. Receive confirmation from the organisation
11. Access relevant courses and certificates

At the same time, the administrator should be able to manage the core operation from one dashboard.

The goal is simple:

People should be able to discover, book, pay, learn, and verify, while the organisation can manage the operation from one place.