AGENTS.md

Project

AquaCore is a professional digital platform for a swimming and aquatic training organisation.

The platform is being developed as a single-organisation product, not a SaaS platform or marketplace.

The system includes:

* Public organisation website
* Swimming and aquatic training programs
* Customer accounts
* Booking and payment
* Online educational courses
* Course progress
* Digital certificates
* Certificate verification
* Admin management dashboard

The approved architecture and product requirements are documented in:

* PRD.md
* AND.md
* GUARDRAILS.md

These documents are the primary project references.

⸻

1. Core Development Principle

Build AquaCore incrementally.

Every development task must be:

1. Small
2. Clearly scoped
3. Necessary for the requested outcome
4. Testable
5. Limited to the files that actually need to change

Do not attempt to build large parts of the application in one task unless explicitly instructed.

If a task can reasonably be split into smaller steps, prefer the smaller step.

⸻

2. Before Making Changes

Before changing code:

1. Read the relevant project documentation.
2. Inspect the existing implementation.
3. Understand the current architecture.
4. Identify the smallest set of files that need modification.
5. Check whether the requested behavior already exists.
6. Preserve existing working functionality.

Do not assume a file should be created or modified simply because it seems related.

⸻

3. Scope Control

Only implement what the current task requires.

Do not add:

* Unrequested features
* Extra pages
* Extra database entities
* Extra API endpoints
* Extra dependencies
* Unrequested UI components
* Future functionality “just in case”
* Complex abstractions without a current need
* AI features unless explicitly requested
* Microservices
* Real-time infrastructure
* Unnecessary state management

If something would be useful later but is not required now, leave it for a future task.

⸻

4. Ask Before Major Decisions

When a decision could materially affect the architecture, product behavior, security, database design, or user experience, stop and ask for confirmation before implementing it.

Examples include:

* Changing the approved technology stack
* Adding a new major dependency
* Changing authentication architecture
* Changing database architecture
* Adding a new user role
* Changing booking rules
* Changing payment behavior
* Introducing a new external service
* Changing the scope of the MVP
* Removing an existing major feature
* Making assumptions about business rules that are currently marked TBD

Do not silently invent business requirements.

⸻

5. Business Assumptions

The organisation’s final business rules are not fully known yet.

Some information is therefore intentionally configurable or marked TBD.

Do not invent:

* Final prices
* Certification/accreditation relationships
* Refund policies
* Training accreditation
* Instructor qualifications
* Course curriculum
* Legal claims
* Official partnerships
* Contact information
* Organisation history
* Testimonials
* Customer statistics
* Claims about certifications being internationally recognised

Use placeholders or configurable values where appropriate.

When a business rule is genuinely required to continue implementation, clearly identify the assumption.

⸻

6. Architecture

The approved architecture is:

Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate

Backend

* Express
* TypeScript
* REST API

Database

* PostgreSQL
* Prisma

Authentication

* JWT
* Secure HttpOnly cookies

Payments

* Paystack

Media

* Cloudinary or another approved external media provider

Email

* Resend

Deployment

* Vercel for the web application
* Render/Railway or equivalent for the API
* Managed PostgreSQL

The project uses a modular monolith architecture.

Do not introduce microservices unless explicitly approved.

⸻

7. Repository Structure

The intended structure is:

aquacore/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── prisma/
├── docs/
├── PRD.md
├── AND.md
├── AGENTS.md
├── GUARDRAILS.md
└── README.md

Follow the existing structure if implementation has already progressed.

Do not reorganise the repository without a specific reason and approval.

⸻

8. Backend Rules

The backend is authoritative.

Never trust the frontend for:

* Authentication
* Authorization
* User ownership
* Pricing
* Payment status
* Booking status
* Certificate validity
* Course access
* Administrative permissions

All important business rules must be enforced server-side.

Frontend validation improves user experience but does not replace backend validation.

⸻

9. API Rules

The API should use the /api/v1 namespace.

Use consistent REST conventions.

Validate incoming request data using the project’s approved validation approach.

Return consistent error responses.

Do not expose:

* Secrets
* Password hashes
* Private tokens
* Internal credentials
* Unnecessary personal information
* Sensitive payment information

Avoid scattering raw API calls throughout frontend components.

Use the project’s API client/service layer.

⸻

10. Authentication and Authorization

The approved authentication model uses JWTs with secure HttpOnly cookies.

Do not store authentication tokens in localStorage.

Authorization must be enforced by the backend.

Current roles:

* CUSTOMER
* ADMIN

Do not create additional roles unless explicitly required.

Admin-only operations must be protected server-side.

A customer must never be able to access another customer’s:

* Bookings
* Payments
* Course progress
* Certificates
* Personal information

⸻

11. Booking Rules

Bookings are request-based.

A customer submits:

* Program
* Participant information
* Location
* Preferred date
* Preferred time
* Required information
* Payment

The requested date/time does not automatically mean the booking is confirmed.

The backend must treat the booking as pending until an administrator confirms it.

Expected booking states include:

* PENDING
* CONFIRMED
* RESCHEDULE_REQUESTED
* COMPLETED
* CANCELLED
* REJECTED
* REFUND_PENDING
* REFUNDED

Do not create an automatic availability system unless explicitly requested.

⸻

12. Pricing Rules

Pricing must be configurable.

Do not hardcode business prices directly into frontend components or scattered backend logic.

The backend must determine the authoritative amount for a booking.

Use integer minor units for monetary calculations.

Never rely on client-submitted prices as the final amount.

⸻

13. Payment Rules

Paystack is the approved payment provider.

The frontend may initiate payment, but payment success must be verified server-side.

Do not mark a booking as paid simply because the frontend reports success.

The backend must verify the transaction with Paystack before treating the payment as successful.

Payment references must be unique and traceable.

Do not expose Paystack secret credentials to the frontend.

⸻

14. Certificate Rules

Certificates must have unique verification identifiers.

Public certificate verification should expose only information appropriate for public verification.

Do not claim that a certificate represents external accreditation unless that accreditation has been confirmed.

Certificate-related business rules should remain configurable until the organisation provides final requirements.

⸻

15. Online Course Rules

The learning system is primarily educational.

The expected structure is:

Course
└── Module
    └── Lesson

Courses may later include:

* Video
* Text
* Images
* Documents
* Quizzes
* Assessments
* Progress tracking

Do not assume that completing an online course automatically grants a professional certification.

Physical training or assessment requirements must remain separate unless the organisation confirms otherwise.

⸻

16. Frontend Rules

The frontend should be:

* Responsive
* Accessible
* Professional
* Clear
* Fast
* Consistent

Public pages should prioritise:

* Trust
* Clear information
* Program discovery
* Strong calls to action
* Mobile usability
* SEO

Customer pages should prioritise:

* Clarity
* Progress
* Booking information
* Course information
* Certificates
* Account management

Admin pages should prioritise:

* Information density
* Clear hierarchy
* Efficient workflows
* Search/filtering where necessary
* Useful status indicators
* Consistent actions

⸻

17. Design Direction

The product should feel like a serious established aquatic/lifesaving organisation.

Reference organisations include:

* American Lifeguard Association
* American Red Cross Lifeguarding
* Royal Life Saving Society UK

Use these references for:

* Information architecture
* Professional presentation
* Course/training organisation
* Trust signals
* Certification presentation
* Booking and learning experiences

Do not copy:

* Logos
* Branding
* Proprietary text
* Proprietary imagery
* Exact layouts
* Exact visual designs

AquaCore must have its own visual identity.

Avoid:

* Generic admin-template appearance
* Cartoonish swimming-school designs
* Excessive gradients
* Excessive animation
* Excessive glassmorphism
* Overly dark interfaces
* Excessive rounded cards
* Decorative UI that reduces usability

⸻

18. UI Consistency

Prefer existing components over creating duplicate components.

Before creating a new reusable component:

1. Check whether an existing component already solves the problem.
2. Check whether the component can reasonably be extended.
3. Only create a new component when there is a real reusable need.

Keep spacing, typography, buttons, forms, tables, cards, navigation, alerts, and status indicators consistent.

⸻

19. Database Rules

Use Prisma for database access.

Database changes must be deliberate.

Before modifying the schema:

1. Understand existing relationships.
2. Check whether an existing entity can support the requirement.
3. Avoid duplicate entities.
4. Consider ownership and authorization.
5. Consider future migration safety.

Do not add speculative database fields or tables.

Use migrations for schema changes.

Never casually modify production data.

⸻

20. Security

Security is a core requirement.

Follow secure defaults for:

* Authentication
* Authorization
* Cookies
* Password handling
* Input validation
* API access
* CORS
* File uploads
* Payment verification
* Sensitive data
* Error messages
* Logging

Never commit secrets.

Never place secret keys in frontend code.

Never log passwords, tokens, payment secrets, or unnecessary personal information.

⸻

21. Dependencies

Do not install a package simply because it is convenient.

Before adding a dependency:

1. Check whether the existing stack can solve the problem.
2. Check whether an existing dependency already provides the capability.
3. Determine whether the dependency is necessary.
4. Consider maintenance and security implications.

For major dependencies, ask for approval before installation.

⸻

22. Error, Loading, and Empty States

Important user-facing flows should account for:

* Loading
* Empty
* Success
* Error
* Unauthorized
* Forbidden
* Not found

Do not build only the happy path.

Errors should be understandable to users while avoiding unnecessary technical details.

⸻

23. Testing

Test important behavior before considering a task complete.

Priority areas include:

* Authentication
* Authorization
* Validation
* Booking creation
* Booking status transitions
* Pricing
* Payment verification
* Customer ownership
* Certificate verification
* Admin permissions

For frontend work, verify:

* Correct rendering
* Form behavior
* Loading states
* Error states
* Responsive behavior
* Navigation
* API integration

Use the smallest appropriate test for the task.

Do not create a large testing framework for a tiny feature unless the project already requires it.

⸻

24. Verification Before Completion

Before reporting a task as complete:

1. Review the changed files.
2. Check for unintended changes.
3. Run the relevant tests.
4. Run lint/type checks when applicable.
5. Verify the requested behavior.
6. Check that existing functionality was not unnecessarily affected.
7. Report any remaining limitation clearly.

Never claim something works if it has not been verified.

⸻

25. Documentation

Documentation is part of the project.

When a significant architectural or product decision is made, record it in the appropriate documentation.

Use:

docs/decisions.md

for major decisions.

Do not modify project documentation simply to make a task appear complete.

Only update documentation when the task actually changes documented behavior, architecture, or requirements.

⸻

26. Git and Change Discipline

Keep changes focused.

A task should ideally produce a small, understandable change set.

Do not mix unrelated:

* Refactors
* Formatting changes
* Dependency upgrades
* UI redesigns
* Bug fixes
* Feature additions

into the same task.

If unrelated problems are discovered, mention them separately instead of silently fixing them.

⸻

27. Working With Existing Code

If existing implementation conflicts with the project documentation:

1. Do not immediately rewrite it.
2. Identify the conflict.
3. Explain the impact.
4. Determine whether the documentation or implementation should change.
5. Ask for approval if the change is significant.

Preserve working behavior unless the current task specifically requires changing it.

⸻

28. When Requirements Are Unclear

Do not guess when ambiguity could affect:

* Security
* Payments
* Database structure
* User permissions
* Booking behavior
* Certification
* Legal/business claims
* Major architecture
* Product scope

Ask a focused question.

If the ambiguity is low-risk and easily reversible, use the simplest reasonable implementation and clearly document the assumption.

⸻

29. Implementation Workflow

For normal feature work, follow this sequence:

Step 1: Understand

Read the relevant requirements and inspect the current code.

Step 2: Plan

Identify the smallest implementation required.

Step 3: Confirm

Ask for approval if the change involves a major decision or unclear business rule.

Step 4: Implement

Make only the required changes.

Step 5: Verify

Run the relevant checks and test the requested behavior.

Step 6: Report

Explain:

* What changed
* Which files changed
* What was verified
* Any limitations
* Any follow-up task that should be handled separately

Do not automatically continue into the next feature.

⸻

30. Default Behaviour for Antigravity

When given a task, do not interpret it as permission to redesign the entire project.

Treat the user’s request literally and narrowly.

If the user says:

Fix the booking button.

Do not also:

* Redesign the booking page
* Change the database
* Add a notification system
* Refactor the API
* Change the authentication system
* Install new packages

unless those changes are genuinely required for the requested fix.

The default approach is:

Understand → Plan → Make the smallest change → Verify → Stop.

⸻

31. Definition of Done

A task is complete when:

* The requested behavior exists.
* The implementation fits the approved architecture.
* Existing functionality remains intact.
* Relevant validation exists.
* Relevant tests/checks pass.
* No unnecessary features were introduced.
* No unexplained architectural decisions were made.
* The implementation is ready for the next small task.

Do not continue automatically after reaching the requested outcome.