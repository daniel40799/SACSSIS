# SACS Student Information System (SIS)

Backend platform for **Saint Alphonsus Catholic School (SACS)** used to manage the full lifecycle of students from **online admission → enrollment → finance → attendance → academic records**.

This system replaces the previous fragmented tools (separate admission, enrollment, attendance, and SMS utilities) with a **single unified platform** built using **Java Spring Boot and MySQL**.

The goal is to provide a **reliable, maintainable, and scalable system** that can support the school’s registrar, accounting, faculty, and administration workflows.

---

# Project Purpose

The existing tools used by the school evolved over time and resulted in:

* separate databases for admission, enrollment, and attendance
* duplicated student identifiers (`school_id`, `id_number`)
* inconsistent relationships between records
* limited data integrity enforcement
* weak indexing and performance issues

This project rebuilds the system from scratch with:

* proper relational design
* enforced foreign keys
* consistent identifiers
* B+Tree index optimization
* modular backend architecture
* controlled database migrations

---

# Technology Stack

Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Spring Security

Database

* MySQL (InnoDB)

Infrastructure

* VPS deployment
* Nginx reverse proxy
* Docker containers

Development Tools

* Flyway (database migrations)
* Maven
* DataGrip

---

# System Scope

The system covers the following operational areas used by SACS staff.

## Admissions

Handles online student applications submitted by parents.

Features include:

* admission application submission
* applicant personal information
* guardian information
* previous school history
* OTP verification for mobile contact
* application tracking numbers
* admission status updates

Tables (planned)

* `admission_applications`
* `admission_contacts`
* `admission_guardians`
* `otp_verifications`

---

## Student Records

Once an applicant is accepted, the record becomes a **student profile** used across the entire system.

Core data includes:

* student identification
* demographic information
* LRN (Learner Reference Number)
* assigned grade level
* section assignment
* guardian relationships

Tables

* `students`
* `student_contacts`
* `student_guardians`

The system uses a **single internal student identifier** while preserving external identifiers like `school_id` and `lrn`.

---

## Academic Structure

Defines the school's academic configuration.

Includes:

* school years
* semesters / terms
* grade levels
* sections
* faculty assignments

Tables

* `school_years`
* `terms`
* `grade_levels`
* `sections`
* `faculties`

---

## Enrollment

Enrollment occurs every academic term.

Workflow includes:

1. student submits enrollment request
2. registrar review
3. accounting approval
4. final enrollment confirmation

Tables

* `enrollment_applications`
* `enrollment_approvals`
* `student_enrollments`

---

## Finance

Handles tuition computation and payment tracking.

Capabilities:

* tuition schedules by grade level
* payment plans
* assessment of charges
* payment proof uploads
* accounting review
* student financial ledger

Tables

* `tuition_schedules`
* `payment_plans`
* `student_assessments`
* `student_assessment_items`
* `payments`
* `payment_proofs`
* `student_ledgers`
* `student_holds`

The system uses a **ledger model** rather than storing balances directly to maintain financial accuracy.

---

## Attendance

Attendance is tracked per student per day.

Tables

* `attendance_records`

Features

* present / absent / tardy status
* daily attendance tracking
* section attendance monitoring

---

## Messaging

Used for system notifications such as OTP verification and SMS announcements.

Tables

* `message_logs`
* `message_recipients`
* `otp_verifications`

---

# Database Design Strategy

## Primary Keys

All tables use:

```
BIGINT UNSIGNED AUTO_INCREMENT
```

This optimizes **InnoDB clustered B+Tree indexes** and ensures efficient joins.

---

## Business Identifiers

Unique constraints enforce critical identifiers:

Examples

* `students.school_id`
* `students.lrn`
* `admission_applications.application_no`

These remain stable identifiers used by staff and students.

---

## Referential Integrity

All relationships enforce foreign keys.

Examples

```
students.person_id → persons.id
student_enrollments.student_id → students.id
payments.student_id → students.id
attendance_records.student_id → students.id
```

This prevents orphaned records.

---

## Index Strategy

Indexes are designed based on expected system queries.

Examples

Student lookup

```
students
UNIQUE (school_id)
UNIQUE (lrn)
```

Enrollment queries

```
student_enrollments
(student_id, school_year_id, term_id)
```

Attendance lookups

```
attendance_records
(student_id, attendance_date)
```

Financial queries

```
student_ledgers
(student_id, transaction_date)
```

These indexes rely on **MySQL InnoDB B+Tree structures** for efficient range and equality queries.

---

# Database Migration Strategy

All schema changes are controlled through **Flyway migrations**.

Migration location

```
src/main/resources/db/migration
```

Example migrations

```
V1__init_identity_tables.sql
V2__init_student_tables.sql
V3__init_academic_tables.sql
```

Hibernate schema auto-generation is disabled in production.

Configuration

```
spring.jpa.hibernate.ddl-auto=validate
```

---

# Development Workflow

1. design table schema
2. create Flyway migration
3. apply migration
4. implement JPA entity
5. implement repository
6. implement service layer
7. expose controller endpoints

---

# Deployment Architecture

Production deployment runs on a VPS with the following structure.

```
Internet
   │
   ▼
Nginx Reverse Proxy
   │
   ▼
Spring Boot Application
   │
   ▼
MySQL Database
```

The application will be containerized using Docker for easier deployment and updates.

---

# Project Status

This project is currently in the **initial system rebuild phase**.

Focus areas:

1. core database design
2. identity and student modules
3. admissions workflow
4. enrollment workflow

The goal is to replace the previous systems with a **single reliable SIS platform** used by SACS staff and students.

---

# Maintainer

Daniel Dalaota
Backend Software Engineer
