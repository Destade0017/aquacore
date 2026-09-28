Product Requirements Document

1. Product Overview

Working Name

AquaCore
Temporary project name. Final organisation name, logo, colours, and brand identity will be provided later.

Product Type

A professional digital platform for a swimming and aquatic training organisation operating in Abuja, Nigeria.

The platform combines:

1. A public-facing organisation website
2. Swimming lesson and training program discovery
3. Customer booking and online payment
4. Customer accounts
5. Online educational courses
6. Student learning/progress tracking
7. Digital certificate management and verification
8. An organisation administration dashboard

The product is intended specifically for the organisation’s own operations. It is not a multi-tenant SaaS platform and should not be designed for unrelated organisations to create their own accounts.

⸻

2. Product Vision

Create a professional digital presence and operational platform that allows customers to discover the organisation, understand its aquatic training services, request and pay for bookings, access educational content, and manage their training history.

The platform should give the organisation a modern, credible digital presence comparable in overall professionalism and information architecture to established aquatic and lifesaving training organisations, while maintaining its own original identity.

The long-term goal is to reduce dependence on manual WhatsApp-based coordination and centralise important customer, booking, payment, learning, and certification information.

⸻

3. Inspiration

The product experience will take inspiration from established aquatic and lifesaving organisations, particularly:

* American Lifeguard Association
* American Red Cross Lifeguarding
* Royal Life Saving Society UK (RLSS UK)

These references are inspiration for:

* Information architecture
* Program/course presentation
* Training discovery
* Certification presentation
* Customer learning experiences
* Professional visual language
* Dashboard concepts
* Trust and credibility

The product must not copy their branding, logos, text, proprietary assets, or exact visual design.

The final interface should be original while achieving a similarly professional and established feel.

⸻

4. Current Business Context

The organisation is assumed to already operate in the swimming/aquatic training space.

Training may take place at:

* Partner swimming pools
* Hotels
* Training centres
* Clients’ private pools
* Other managed locations

The organisation operates in Abuja and may use multiple locations.

The exact organisation name, branding, certification relationships, pricing, course catalogue, and operational policies are currently unknown and must therefore remain configurable.

⸻

5. Target Users

5.1 Parents / Guardians

Parents or guardians looking to arrange swimming lessons or aquatic training for children.

Primary needs:

* Understand available programs
* Compare suitable options
* Submit a booking request
* Choose a preferred location
* Choose preferred date/time
* Pay online
* Track booking status
* View training history

⸻

5.2 Adult Learners

Adults interested in learning or improving swimming skills.

Primary needs:

* Discover adult swimming programs
* Understand program requirements
* Submit bookings
* Pay online
* Track training

⸻

5.3 Teenagers / Young Learners

Teenagers participating in swimming lessons or aquatic training.

Depending on age and organisational policy, accounts and payments may be managed by a parent/guardian.

⸻

5.4 Competitive Swimmers

People interested in developing swimming ability for competitive purposes.

The exact competitive training offering is currently TBD and should be configurable.

⸻

5.5 Aspiring Lifeguards

People interested in lifeguard training and related aquatic safety education.

⸻

5.6 Schools

Schools seeking swimming education, aquatic safety programs, or organised training.

⸻

5.7 Hotels and Organisations

Hotels, companies, schools, and other organisations that may require aquatic safety, swimming, or training services.

⸻

5.8 General Public

Anyone seeking swimming education, water-safety knowledge, or aquatic training.

⸻

6. Core Product Areas

The application will consist of the following major areas:

Public Website

* Homepage
* About
* Programs
* Program details
* Training/course catalogue
* Locations
* Certifications
* FAQs
* Contact
* Testimonials
* Relevant educational/resources content

Customer Platform

* Registration/login
* Customer dashboard
* Profile
* Bookings
* Payments
* Courses
* Course progress
* Certificates
* Notifications

Administration Platform

* Dashboard overview
* Customers
* Bookings
* Programs
* Courses
* Locations
* Payments
* Certificates
* Website/content management
* Settings

⸻

7. Swimming Programs

The initial product catalogue should support configurable swimming programs such as:

* Children’s Swimming
* Adult Swimming
* Private Swimming Lessons
* Group Swimming Lessons
* Competitive Swimming

The organisation must be able to create, edit, activate, deactivate, and configure programs from the administration dashboard.

Each program should support configurable information including:

* Name
* Description
* Category
* Target audience
* Duration
* Pricing
* Location availability
* Requirements
* Session structure
* Images/media
* Status

⸻

8. Training Programs

The platform should support training programs such as:

* Lifeguard Training
* CPR
* First Aid
* Water Safety
* Swimming Instructor Training

The exact catalogue is configurable and should not be hardcoded into the application.

Training programs should support:

* Description
* Target audience
* Requirements
* Duration
* Delivery method
* Physical/online classification
* Price
* Location
* Course materials
* Certification information
* Status

⸻

9. Booking System

9.1 Booking Flow

The intended booking flow is:

Customer
↓
Select Program
↓
Select/Enter Preferred Location
↓
Select Preferred Date
↓
Select Preferred Time
↓
Enter Participant Information
↓
Review Price
↓
Pay Online
↓
Booking Created
↓
Admin Reviews
↓
Confirmed / Rescheduled / Rejected

The initial system should not attempt to automatically determine real-world instructor or pool availability.

Customers submit their preferred date and time.

The organisation administrator confirms the booking manually.

⸻

9.2 Booking Statuses

The system should support statuses such as:

* Pending
* Confirmed
* Reschedule Requested
* Completed
* Cancelled
* Rejected
* Refund Pending
* Refunded

Exact operational rules can be refined later.

⸻

9.3 Booking Information

A booking may contain:

* Customer
* Participant(s)
* Program
* Location
* Preferred date
* Preferred time
* Number of participants
* Price
* Payment status
* Booking status
* Customer notes
* Admin notes
* Created date
* Updated date

⸻

10. Flexible Pricing

Pricing must not be hardcoded.

The system should support configurable pricing that may eventually depend on:

* Program
* Individual vs group
* Number of participants
* Number of sessions
* Location
* Course type
* Duration
* Other organisational rules

The exact pricing model will be implemented once the business requirements are confirmed.

⸻

11. Payments

The initial payment provider will be:

Paystack

Customers are expected to make full payment online before the booking is considered paid.

The system should:

* Create payment transactions
* Redirect/initiate Paystack checkout
* Verify payments server-side
* Store payment status
* Associate payments with bookings
* Handle failed payments
* Handle successful payments
* Record transaction references
* Support future refund workflows

Payment confirmation must never rely solely on frontend/client-side information.

⸻

12. Customer Accounts

Customers should be able to create accounts and access a personal dashboard.

The dashboard should eventually provide:

Overview

* Upcoming bookings
* Booking status
* Course progress
* Recent payments
* Certificates

Bookings

* Current bookings
* Previous bookings
* Booking details
* Payment information
* Status updates

Courses

* Enrolled courses
* Course progress
* Completed lessons
* Assessments

Certificates

* Earned certificates
* Certificate details
* Certificate ID
* Verification information

Profile

* Personal information
* Contact information
* Account settings

⸻

13. Online Learning

The platform should support online educational content.

Online courses may contain:

* Courses
* Modules
* Lessons
* Videos
* Text
* Images
* Documents
* Quizzes/assessments
* Learning progress

The initial project may contain placeholder/demo course content because actual course materials will be supplied later.

The system architecture should make it possible to add real course content without restructuring the application.

⸻

14. Physical Certification

Online educational content should not automatically imply professional certification.

The organisation may require:

* Physical attendance
* Practical training
* Physical assessment
* Instructor approval
* Other requirements

before issuing a professional certificate.

The exact certification/accreditation structure is currently TBD.

The system must therefore avoid making unsupported claims about accreditation or certification authority.

⸻

15. Certificate System

The platform should support digital certificates.

A certificate may contain:

* Student name
* Course/program name
* Certificate ID
* Issue date
* Expiry date where applicable
* Instructor/organisation information
* Verification information
* QR code where appropriate

Each certificate should have a unique identifier.

A public certificate verification page should eventually allow someone to verify whether a certificate exists and is valid.

The exact certificate format and certification authority are TBD.

⸻

16. Locations

The organisation may operate across multiple swimming/training locations.

The administrator should be able to manage:

* Location name
* Address
* Description
* Location type
* Contact information
* Facilities
* Images
* Availability notes
* Active/inactive status

Location types may include:

* Partner pool
* Hotel pool
* Training centre
* Client private pool
* Other

⸻

17. Administration Dashboard

The organisation will initially have one primary administrator.

The dashboard should provide a central operational interface.

Dashboard Overview

Possible metrics:

* Total customers
* Pending bookings
* Confirmed bookings
* Upcoming sessions
* Completed training
* Revenue/payment overview
* Active courses
* Certificates issued
* Recent activity

Metrics should reflect actual stored data rather than fabricated values.

⸻

Customer Management

Admin should be able to:

* View customers
* Search customers
* View customer profiles
* View booking history
* View payment history
* View course enrolments
* View certificates

⸻

Booking Management

Admin should be able to:

* View bookings
* Search/filter bookings
* Review booking details
* Confirm bookings
* Reject bookings
* Request rescheduling
* Mark bookings completed
* Handle cancellations
* Record refund decisions

⸻

Program Management

Admin should be able to:

* Create programs
* Edit programs
* Publish/unpublish programs
* Configure pricing
* Configure locations
* Upload images
* Configure requirements

⸻

Course Management

Admin should eventually be able to:

* Create courses
* Create modules
* Create lessons
* Upload course materials
* Add videos
* Create assessments
* Publish/unpublish courses
* View student progress

⸻

Certificate Management

Admin should be able to:

* Issue certificates
* View certificates
* Search certificates
* Revoke certificates where appropriate
* Manage certificate status
* Verify certificates

⸻

18. Website Content Management

The organisation should eventually be able to manage important website content without modifying code.

Potential editable content:

* Homepage sections
* Programs
* Courses
* Locations
* FAQs
* Testimonials
* Contact information
* Images
* Announcements

The exact CMS functionality will be determined during implementation.

⸻

19. Notifications

The system should eventually support notifications for important events.

Potential notifications include:

* Account creation
* Booking received
* Payment successful
* Booking confirmed
* Booking rescheduled
* Booking cancelled
* Course enrolment
* Course completion
* Certificate issued

Email will be the initial notification channel.

SMS/WhatsApp automation is not part of the initial MVP.

⸻

20. Design Requirements

The product should feel:

* Professional
* Trustworthy
* Modern
* Established
* Educational
* International
* Aquatic without becoming visually gimmicky
* Appropriate for both parents and professional trainees

The design should take inspiration from established aquatic/lifesaving organisations while remaining original.

Avoid:

* Generic swimming-school templates
* Excessive gradients
* Excessive animation
* Cartoonish aquatic graphics
* Unnecessary glassmorphism
* Overly dark interfaces
* Excessive rounded cards
* Visual clutter

The dashboard should prioritise:

* Clear information hierarchy
* Efficient navigation
* Strong typography
* Useful data density
* Responsive behaviour
* Accessible controls
* Consistent components
* Professional empty/loading/error states

⸻

21. Branding

Temporary branding will be used during development.

Temporary:

* Organisation name: AquaCore
* Logo: Temporary generated text/logo treatment
* Colours: To be established in the design system

The architecture must make replacing the temporary brand straightforward.

The final organisation name and branding will be supplied later.

⸻

22. Authentication

The application should support authenticated customer and administrator access.

Initial roles:

CUSTOMER

Can:

* Manage own profile
* Create/view own bookings
* View own payments
* Access enrolled courses
* View own progress
* View own certificates

ADMIN

Can:

* Manage customers
* Manage bookings
* Manage programs
* Manage courses
* Manage locations
* Manage payments
* Manage certificates
* Manage relevant website content
* Access administrative analytics

The initial product does not require multiple staff roles.

⸻

23. Security Requirements

The application must:

* Hash passwords securely
* Use secure authentication mechanisms
* Protect administrative routes
* Enforce authorization server-side
* Validate all incoming data
* Verify Paystack transactions server-side
* Never expose sensitive payment secrets to the client
* Protect sensitive customer information
* Prevent users from accessing another user’s private records
* Apply appropriate rate limiting to authentication-sensitive endpoints
* Use secure HTTP-only cookies where applicable
* Keep secrets in environment variables
* Avoid exposing internal errors to users

⸻

24. Performance Requirements

The public website should be fast and SEO-friendly.

The application should:

* Optimise images
* Lazy-load appropriate media
* Avoid unnecessary client-side JavaScript
* Use server rendering where beneficial
* Avoid excessive API requests
* Provide loading states
* Handle slow network conditions gracefully

⸻

25. Responsive Requirements

The website must work properly across:

* Mobile
* Tablet
* Laptop
* Desktop

The customer booking flow must be particularly usable on mobile because many Nigerian customers may access the platform primarily from their phones.

⸻

26. SEO Requirements

Public pages should support:

* Semantic HTML
* Page titles
* Meta descriptions
* Open Graph metadata
* Search-engine-friendly URLs
* Structured content
* Sitemap
* Robots configuration
* Appropriate headings
* Local SEO considerations for Abuja

Authenticated dashboard pages do not need to be indexed.

⸻

27. MVP Scope

The initial MVP should focus on:

Public

* Homepage
* About
* Programs
* Program detail pages
* Locations
* Contact
* FAQs
* Authentication

Customer

* Registration/login
* Customer dashboard
* Booking creation
* Booking history
* Payment
* Basic profile
* Basic certificates view

Admin

* Admin dashboard
* Customer management
* Program management
* Location management
* Booking management
* Payment visibility
* Certificate management

Infrastructure

* Authentication
* PostgreSQL database
* API
* Paystack integration
* Responsive UI
* Error/loading/empty states
* Basic email notifications

⸻

28. Post-MVP Scope

The following should be developed after the core MVP is stable:

* Full online learning system
* Course modules
* Video lessons
* Quizzes
* Learning progress
* Automated certificate generation
* QR certificate verification
* Advanced reporting
* Rich content management
* Automated email workflows
* Advanced notifications
* Student assessments
* More detailed training records

⸻

29. Explicitly Out of Scope

The initial project will not include:

* Multi-tenant SaaS functionality
* Marketplace functionality
* Third-party organisation accounts
* Mobile native applications
* Complex instructor accounts
* Automated pool/instructor scheduling
* AI chatbot
* AI-generated training plans
* Cryptocurrency payments
* International payment infrastructure unless later required
* Microservices architecture
* Complex real-time infrastructure
* WhatsApp automation in MVP

These may be reconsidered only when there is a demonstrated business requirement.

⸻

30. Future Flexibility

The application should be designed so that the following can be added later without major architectural rewrites:

* Multiple staff/admin roles
* Instructor accounts
* Advanced scheduling
* More payment providers
* SMS/WhatsApp notifications
* More course types
* Advanced assessments
* Automated certificates
* Additional locations
* More complex pricing
* Rich reporting

However, future flexibility must not become an excuse to over-engineer the MVP.

⸻

31. Product Principles

1. Real business first

The application should solve actual organisational problems rather than exist purely as a showcase.

2. Configurable over hardcoded

Business data such as programs, prices, locations, courses, and certificates should be data-driven.

3. Simple before complex

Do not introduce infrastructure or features without a demonstrated need.

4. Secure by default

Authentication, authorization, payments, and customer information must receive appropriate security controls from the beginning.

5. Mobile-first customer experience

The customer journey should work exceptionally well on mobile.

6. Professional presentation

The website should feel credible enough for parents, schools, hotels, companies, and professional trainees.

7. Incremental development

Features should be implemented in small, verifiable increments.

8. No invented business facts

Unknown organisational information must be treated as TBD or configurable rather than invented as fact.

⸻

32. Open Decisions / TBD

The following are intentionally unresolved:

* Final organisation name
* Final logo
* Final brand identity
* Final colour palette
* Exact service catalogue
* Exact pricing
* Certification/accreditation relationships
* Exact certificate requirements
* Exact refund policy
* Exact booking confirmation policy
* Course content
* Training curriculum
* Instructor information
* Exact business contact information
* Legal/privacy requirements specific to the organisation

Until confirmed, these should use configurable placeholders or clearly labelled temporary content.

⸻

33. Success Criteria

The MVP should allow a potential customer to:

1. Discover the organisation.
2. Understand its swimming/training offerings.
3. Select an appropriate program.
4. Submit a booking request.
5. Provide a preferred date/time and location.
6. Pay online.
7. Receive confirmation of payment.
8. Create/access an account.
9. Track booking status.

The administrator should be able to:

1. View customers.
2. View bookings.
3. Review and update booking status.
4. Manage programs.
5. Manage locations.
6. View payments.
7. Manage certificates.
8. Access an operational dashboard.

The final result should feel like a real, professional aquatic training organisation platform, rather than a static website or a generic admin template.

⸻

34. Development Philosophy

The product will be developed incrementally.

No single development task should attempt to implement the entire platform.

Each feature should:

1. Have a clearly defined scope.
2. Modify only necessary files.
3. Preserve existing functionality.
4. Be tested before moving to the next feature.
5. Avoid unnecessary dependencies.
6. Avoid speculative functionality.
7. Follow the established architecture and design system.

The AI development agent must treat this PRD as the primary product-level source of truth while recognising that confirmed information from the organisation owner may supersede temporary assumptions marked as TBD.