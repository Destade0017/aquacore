GUARDRAILS.md

AquaCore Development Guardrails

This document defines the non-negotiable technical, security, product, and development boundaries for AquaCore.

These rules apply to all development work unless explicitly changed and approved.

⸻

1. Core Principle

AquaCore should be built as a real business product, not as a demo that only works on the happy path.

Priorities:

1. Security
2. Data integrity
3. Correct business logic
4. Reliability
5. Maintainability
6. User experience
7. Visual polish

Never sacrifice security or data integrity for convenience.

⸻

2. Authentication Guardrails

Required

Authentication must use secure server-managed mechanisms.

The approved approach is:

* JWT
* Secure HttpOnly cookies
* Appropriate cookie security settings
* Server-side authentication checks

Forbidden

Do not:

* Store authentication tokens in localStorage
* Store authentication tokens in sessionStorage
* Expose JWT secrets to the frontend
* Put secrets in client-side environment variables
* Trust user-provided role information
* Implement authentication only on the frontend
* Allow unauthenticated access to protected API endpoints

The backend must determine whether a user is authenticated.

⸻

3. Authorization Guardrails

Authentication answers:

Who is this user?

Authorization answers:

What is this user allowed to do?

Both must be enforced server-side.

Current roles:

CUSTOMER
ADMIN

Never rely on hidden buttons or frontend route protection as the only authorization mechanism.

For every protected resource, verify that the authenticated user has permission to access it.

A customer must never be able to access another customer’s:

* Profile
* Booking
* Payment
* Course enrollment
* Course progress
* Certificate
* Private information

Changing an ID in a URL must never grant access to another user’s resource.

⸻

4. Admin Guardrails

Administrative functionality must be protected at the API level.

The frontend may hide admin controls from customers, but that is only a usability measure.

The backend must independently verify:

Authenticated user
        ↓
Valid session
        ↓
ADMIN role
        ↓
Allowed operation

Never assume that a request coming from an admin page is automatically authorized.

⸻

5. Password Guardrails

Passwords must never be stored in plaintext.

Use a secure password hashing mechanism.

Never:

* Log passwords
* Return passwords in API responses
* Include password hashes in normal user responses
* Send passwords through email
* Store passwords in frontend state unnecessarily

Password reset tokens must be treated as sensitive credentials.

⸻

6. Cookie Guardrails

Authentication cookies should use appropriate security settings.

Production cookies should use:

* HttpOnly
* Secure
* Appropriate SameSite
* Appropriate expiration

Cookie configuration must account for the relationship between the web application and API.

Do not weaken cookie security simply to make local development easier.

If a development exception is necessary, keep it development-only.

⸻

7. API Guardrails

Every API endpoint must have an intentional access model.

For each endpoint, determine:

* Public?
* Authenticated?
* Customer only?
* Admin only?
* Resource owner only?

Do not accidentally expose sensitive endpoints publicly.

Do not rely on obscure URLs as security.

⸻

8. Input Validation

Never trust client input.

Validate data at the API boundary.

Validate:

* Required fields
* Data types
* String lengths
* Email formats
* Dates
* Times
* IDs
* Enum values
* Numeric values
* File metadata where applicable

Reject invalid requests before business logic executes.

Frontend validation may improve UX but does not replace backend validation.

⸻

9. SQL and Database Guardrails

Use Prisma for database access.

Do not construct unsafe raw SQL from user-controlled input.

When raw SQL is genuinely necessary, use safe parameterized mechanisms.

Never expose:

* Database credentials
* Database connection strings
* Internal database errors
* Prisma stack traces
* Sensitive schema details

to normal users.

⸻

10. Data Ownership Guardrail

Resource ownership must always be checked server-side.

Example:

GET /api/v1/bookings/:id

The backend must verify:

Does this booking exist?
        ↓
Is the user authenticated?
        ↓
Is the user allowed to access this booking?
        ↓
Return booking

Never assume that possession of a database ID means ownership.

⸻

11. Payment Guardrails

Paystack is a trusted external payment provider, but the client must never be trusted to declare payment success.

The payment flow should conceptually be:

Customer
   ↓
Create booking
   ↓
Backend determines amount
   ↓
Backend creates payment reference
   ↓
Customer pays through Paystack
   ↓
Paystack processes payment
   ↓
Backend verifies transaction
   ↓
Backend records payment result
   ↓
Booking/payment state updated

The backend must verify payment status.

Never accept:

paymentStatus = "successful"

from the browser as proof of payment.

⸻

12. Payment Amount Guardrail

The frontend must never be the authoritative source for the amount charged.

Do not trust:

amount
price
total
discount

submitted by the client.

The backend must determine the authoritative amount using server-side pricing rules.

Use integer minor units for monetary calculations.

For Nigerian Naira:

₦10,000

should conceptually be represented as:

1000000

when interacting with systems that use kobo.

Avoid floating-point arithmetic for financial calculations.

⸻

13. Payment Reference Guardrail

Every payment must have a traceable reference.

References should be unique and associated with the appropriate booking/payment record.

Do not reuse payment references.

Do not allow arbitrary client-generated references to overwrite existing payment records.

⸻

14. Booking Guardrails

A booking request is not automatically a confirmed appointment.

The system must distinguish between:

Requested
Confirmed
Reschedule requested
Rejected
Cancelled
Completed

Payment success does not automatically mean the requested time is available.

The organisation administrator must be able to review and confirm the booking.

Do not build automatic slot availability unless explicitly required.

⸻

15. Booking State Guardrail

Booking status changes must follow intentional business rules.

Do not allow arbitrary status transitions from the frontend.

For example, a customer should not be able to send:

status = "CONFIRMED"

and cause the backend to confirm their own booking.

The backend controls valid state transitions.

⸻

16. Pricing Guardrail

Pricing must remain configurable.

Do not scatter prices throughout:

* React components
* Pages
* API controllers
* Hardcoded constants
* Client-side forms

Pricing should have a clear authoritative source.

If the organisation’s final pricing model is unknown, implement configurable structures rather than inventing permanent prices.

⸻

17. Refund Guardrail

Refund behavior is currently a business requirement that may require confirmation.

Do not invent a refund policy.

Do not automatically promise:

* Full refunds
* Partial refunds
* Automatic refunds
* Refund deadlines

unless the organisation confirms the policy.

Build refund functionality only when the rules are known.

⸻

18. Certificate Guardrails

Certificates are official-looking documents and must be treated carefully.

Do not claim:

* Government accreditation
* International accreditation
* External certification
* Professional licensing
* Recognition by another organisation

unless explicitly confirmed.

Every certificate should have a unique verification identifier.

Public verification should expose only appropriate information.

Do not expose unnecessary private customer data through certificate verification.

⸻

19. Online Course Guardrails

Online course completion must not automatically imply professional certification.

Unless explicitly confirmed:

Online course completion
        ≠
Professional certification

Physical training and assessment may be required.

The system must keep educational course completion separate from certification issuance.

⸻

20. Personal Data Guardrails

AquaCore may handle personal information such as:

* Name
* Email
* Phone number
* Participant information
* Booking details
* Payment references
* Course progress
* Certificate information

Collect only information required for the product.

Do not expose personal data unnecessarily.

Do not return entire user objects when only a few fields are required.

Do not expose private customer information through:

* Public URLs
* Search results
* Certificate verification
* Error messages
* Logs
* Client-side debug output

⸻

21. Logging Guardrails

Logs must help developers diagnose problems without becoming a second database of sensitive information.

Never log:

* Passwords
* JWTs
* Refresh tokens
* API secret keys
* Paystack secret keys
* Full payment credentials
* Unnecessary personal information

Use structured logging where practical.

⸻

22. Environment Variables

Secrets belong in environment variables or the approved secret-management system.

Never commit:

.env
.env.local
.env.production

containing real secrets.

Never place secret values in:

* Source code
* Documentation
* Git commits
* Screenshots
* Client-side bundles

Public frontend variables must contain only information safe for browser exposure.

⸻

23. CORS Guardrail

CORS must be explicitly configured.

Do not use unrestricted:

Access-Control-Allow-Origin: *

together with credentialed authentication.

Only approved frontend origins should be allowed in production.

⸻

24. File Upload Guardrails

If file uploads are introduced:

Validate:

* File type
* File size
* File extension
* Upload destination
* Access permissions

Do not trust the filename or MIME type alone.

Do not allow arbitrary executable files to be uploaded and served as application code.

User-uploaded files should use an appropriate external storage/media provider when applicable.

⸻

25. Media Guardrails

Images and videos should not be stored unnecessarily inside the application repository.

Use the approved media provider for production media.

Do not commit large media assets into Git unless there is a specific reason.

Video delivery should be designed for streaming rather than serving large raw files directly from the application server.

⸻

26. Public Verification Guardrail

Certificate verification pages are intentionally public.

However, public does not mean unrestricted access to all certificate data.

A verification page should provide enough information to answer:

Is this certificate record valid?

without exposing unnecessary private information.

⸻

27. Admin Data Guardrail

The admin dashboard may have broad access, but broad access does not mean careless exposure.

Admin APIs should return only the information needed for the operation.

Avoid sending sensitive information to the browser simply because the administrator technically has permission to access it.

⸻

28. Error Handling Guardrail

Production errors should be useful without exposing internal implementation details.

Do not expose:

* Stack traces
* SQL queries
* Database credentials
* Environment variables
* Internal filesystem paths
* Secret values

Example user-facing response:

Something went wrong. Please try again.

Detailed technical information belongs in secure server logs.

⸻

29. Dependency Guardrail

Do not add dependencies without a clear reason.

Before installing a package:

1. Check existing dependencies.
2. Check whether native functionality is sufficient.
3. Check whether an existing project abstraction can solve the problem.
4. Consider security and maintenance.
5. Install only what is necessary.

Avoid dependency bloat.

⸻

30. Architecture Guardrail

The approved architecture is a modular monolith.

Do not introduce:

* Microservices
* Kubernetes
* Event-driven infrastructure
* Redis
* Message queues
* Distributed caching
* Complex background workers
* Real-time infrastructure

unless a real requirement emerges and the change is explicitly approved.

Complexity must be earned by actual product requirements.

⸻

31. No Speculative Features

Do not implement future features early simply because they might eventually be useful.

Examples:

* SMS automation
* WhatsApp automation
* AI chatbot
* Advanced instructor scheduling
* Multi-tenant organisations
* Mobile applications
* Automated training plans
* Complex analytics
* International payment systems

These remain outside the current scope unless explicitly added.

⸻

32. No Multi-Tenant SaaS

AquaCore is for one organisation.

Do not introduce:

* Organisation IDs
* Tenant isolation
* Tenant switching
* Organisation billing
* Multiple organisation accounts
* SaaS subscription systems

unless the product requirements explicitly change.

⸻

33. No Invented Business Claims

Do not create fake:

* Testimonials
* Statistics
* Accreditations
* Partnerships
* Awards
* Instructor qualifications
* Customer numbers
* Years of experience
* Certification claims

Placeholder/demo content must be clearly identifiable as such during development.

⸻

34. UI Security Guardrail

Never treat UI visibility as authorization.

For example:

if (user.role === "ADMIN") {
    showDeleteButton()
}

is not security.

The API must independently enforce the permission.

Frontend restrictions exist for user experience.

Backend restrictions exist for security.

⸻

35. Mobile Guardrail

The public platform must work well on mobile devices.

Do not create desktop-only workflows for:

* Booking
* Payment
* Login
* Registration
* Course access
* Certificate verification

Important actions should remain usable on smaller screens.

⸻

36. Accessibility Guardrail

Do not sacrifice accessibility for visual design.

Important interfaces should account for:

* Keyboard navigation
* Labels
* Focus states
* Readable text
* Sufficient contrast
* Clear error messages
* Semantic HTML
* Accessible interactive controls

Avoid relying on colour alone to communicate important states.

⸻

37. SEO Guardrail

Public-facing pages should be designed with search engines in mind.

Important public pages should have appropriate:

* Page titles
* Metadata
* Descriptions
* Semantic structure
* Crawlable content
* Useful URLs

Private dashboards do not need to be publicly indexed.

⸻

38. Change Guardrail

When fixing a bug, fix the underlying issue without unnecessarily rewriting unrelated code.

Avoid:

Small bug
↓
Large refactor
↓
Unrelated changes
↓
New bugs

Prefer:

Identify root cause
↓
Make smallest safe fix
↓
Verify
↓
Stop

⸻

39. Documentation Guardrail

Documentation must describe reality.

Do not update documentation to claim functionality that does not exist.

Do not create fictional architecture diagrams or implementation details.

When architecture changes, update the relevant documentation intentionally.

⸻

40. AI Agent Guardrail

Antigravity must not assume permission to make broad changes.

For each task:

1. Understand the request.
2. Inspect relevant code.
3. Identify the smallest change.
4. Implement only that change.
5. Verify it.
6. Stop.

If a major decision is required, ask before proceeding.

The AI agent must not use the existence of these instructions as permission to redesign the product.

⸻

41. Final Safety Rule

When in doubt, prefer:

Less code, fewer assumptions, smaller scope, stronger validation, and explicit confirmation.

AquaCore should grow feature by feature.

Every new feature must earn its place in the system.