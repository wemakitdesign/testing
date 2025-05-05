# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/adb0dded-c2d9-4001-8098-fa7dad4dd3d5

---

## Core Features

### Authentication & Authorization
- Role-based authentication (Client, Designer, Admin)
- Protected routes with role-based access control
- Email verification system
- Session management
- Secure password handling

### Client Dashboard
- Project overview and status tracking
- New request creation with enhanced UI
- Request history and detailed view
- Direct messaging with designers
- Billing and subscription management
- Company information management

### Designer Dashboard
- Workload overview and task management
- Time tracking system
- Schedule management
- Project status updates
- File attachment handling
- Priority-based task organization

### Admin Dashboard
- User management system
- Project oversight
- Analytics and reporting
- Billing administration
- System configuration

### Common Features
- Modern UI with shadcn-ui components
- Real-time notifications
- Responsive design
- File upload capabilities
- Status tracking system
- Breadcrumb navigation
- Pagination system

## Known Issues & Bugs

### Authentication
- Email verification flow needs improvement
- Password reset functionality pending
- Session timeout handling needs enhancement

### Client Features
- File upload size limits not enforced
- Company information form needs validation
- Payment processing error handling incomplete

### Designer Features
- Time tracking needs offline support
- Task priority updates not real-time
- Schedule conflicts not prevented

### Admin Features
- Analytics data refresh rate needs optimization
- Bulk user management actions pending
- Report generation needs caching

## Route Structure

### Public Routes
- `/` - Landing page
- `/login` - Authentication
- `/signup` - User registration
- `/create-account` - Account setup
- `/checkout` - Payment processing
- `/company-information` - Company details
- `/success` - Success page
- `/book-a-call` - Consultation booking

### Client Routes
- `/dashboard` - Main dashboard
- `/dashboard/requests/new` - New request
- `/dashboard/requests/history` - Request history
- `/dashboard/requests/:requestId` - Request details
- `/dashboard/billing` - Billing management

### Designer Routes
- `/dashboard/designer` - Designer dashboard
- `/dashboard/tasks` - Task management
- `/dashboard/tasks/:taskId` - Task details
- `/dashboard/time-tracking` - Time tracking
- `/dashboard/schedule` - Schedule management

### Admin Routes
- `/dashboard/admin` - Admin dashboard
- `/dashboard/projects` - Project management
- `/dashboard/users` - User management
- `/dashboard/analytics` - Analytics
- `/dashboard/billing-admin` - Billing admin

### Shared Routes
- `/dashboard/settings` - User settings
- `/dashboard/user/profile` - Profile management
- `/dashboard/help` - Help center

## Dependencies

### Core Dependencies
- React 18.x
- TypeScript 5.x
- Vite 5.x
- React Router 6.x
- React Query
- Supabase Client

### UI Dependencies
- shadcn-ui
- Tailwind CSS
- Lucide Icons
- React Slick
- Sonner (Toast notifications)

### Development Dependencies
- ESLint
- TypeScript ESLint
- Prettier
- Vite SWC Plugin
- Lovable Tagger

## Setup Instructions

```sh
# Clone repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

## Development Notes

### Recent Updates
- First name only display in all user interfaces
- Removed ⌘K shortcut and button
- Enhanced client-designer messaging
- Improved New Request UI/UX
- Updated documentation

### Pending Improvements
- Implement real-time notifications
- Add offline support
- Enhance error handling
- Optimize performance
- Add comprehensive testing

## What's New (Changelog)

### v1.0.0 (Initial Release)
- Basic dashboard and authentication flows.
- CRUD for Projects, Designers, Clients, and Tasks.
- Supabase integration for authentication and database.

---

### v1.1.0
- Enhanced: Role-based dashboards for Client, Designer, and Admin with navigation and sidebar logic.
- Improved: Filtering, searching, and project listing.

---

### v1.2.0
- Added: Designer Workload overview, charts on dashboard.
- Improved: Notifications and Profile Dropdown with avatar.

---

### v1.3.0
- UI improved: Added Hero section, Features, Brands, and Testimonials on public pages.
- Billing page and Stripe integration for subscription management.

---

### v1.4.0
- Bugfix: Improved Toast notifications throughout the dashboard.
- Improved: Task details and Scheduler for Designers.

---

### v1.5.0 (**THIS VERSION** — 2025-04-21)
- **First Name Only Behavior:** Semua tampilan nama user di dashboard dan pojok kanan atas (ProfileDropdown/HeaderSection) sekarang HANYA menampilkan first name saja.
- **Hapus Button ⌘K:** Seluruh komponen dashboard SEMUA role sudah dipastikan tidak lagi menampilkan ataupun menyisakan tombol/shortcut ⌘K.
- **Fungsi Message Designer**: Kini aktif di dashboard client dan halaman New Request—memungkinkan user client untuk mengirim pesan langsung ke designer terkait projek.
- **Enhanced UI/UX:** Halaman New Request pada Client Dashboard di-*refactor* agar lebih informatif dan menarik secara visual.
- **Dokumentasi diperbarui**: README serta instruksi penggunaan mengikuti fitur-fitur terbaru di atas.

---

### v1.6.1 (Latest)
- All dashboard and detail pages now use English for all UI labels, messages, and notifications.
- All task and comment relationships now use the `clients` table for user references (no more `users` table for comments).
- Fixed all foreign key and relationship issues between `comments`, `tasks`, and `clients` in Supabase.
- Improved error handling and null checking in all detail and comment pages to prevent blank/empty screens.
- All static and dynamic text, placeholders, and button labels are now in English for a consistent user experience.
- Migration from Indonesian to English UI is complete and all workflows are now fully in English.

---

## How can I edit this code?

Simply visit the [Lovable Project](https://lovable.dev/projects/adb0dded-c2d9-4001-8098-fa7dad4dd3d5) and start prompting.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/adb0dded-c2d9-4001-8098-fa7dad4dd3d5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/adb0dded-c2d9-4001-8098-fa7dad4dd3d5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Database Setup (with Supabase)

This project uses Supabase as the database provider. There are two setup options:

### Option 1: Clean Installation (Production)

1. Navigate to your Supabase project dashboard
2. Go to SQL Editor
3. Run the following SQL to set up the production tables:

```sql
-- Create tables
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE designers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  capacity INTEGER DEFAULT 100,
  active_projects INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  client_id UUID REFERENCES clients(id),
  designer_id UUID REFERENCES designers(id),
  status TEXT CHECK (status IN ('pending', 'inProgress', 'review', 'revisions', 'completed', 'onHold')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  deadline TIMESTAMPTZ,
  completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  designer_id UUID REFERENCES designers(id),
  status TEXT CHECK (status IN ('upcoming', 'inProgress', 'completed')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  description TEXT,
  has_notification BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Option 2: Demo Data Installation

1. First, run the clean installation SQL above
2. Then run the following SQL to populate demo data:

```sql
-- Insert demo clients
INSERT INTO clients (name, email) VALUES
('Acme Corporation', 'contact@acme.com'),
('TechStart Inc', 'info@techstart.com'),
('Design Hub', 'hello@designhub.com');

-- Insert demo designers
INSERT INTO designers (name, email, capacity, active_projects) VALUES
('Jane Designer', 'jane@wemakit.com', 80, 2),
('John Creative', 'john@wemakit.com', 100, 1),
('Sarah Artist', 'sarah@wemakit.com', 90, 3);

-- Insert demo projects
INSERT INTO projects (name, client_id, designer_id, status, priority, deadline, completion_percentage) VALUES
('Website Redesign', (SELECT id FROM clients WHERE email='contact@acme.com'), 
(SELECT id FROM designers WHERE email='jane@wemakit.com'),
'inProgress', 'high', NOW() + INTERVAL '30 days', 35),
('Mobile App Design', (SELECT id FROM clients WHERE email='info@techstart.com'),
(SELECT id FROM designers WHERE email='john@wemakit.com'),
'pending', 'medium', NOW() + INTERVAL '45 days', 0);

-- Insert demo tasks
INSERT INTO tasks (title, project_id, designer_id, status, priority, start_time, end_time, description) VALUES
('Homepage Wireframes', 
(SELECT id FROM projects WHERE name='Website Redesign'),
(SELECT id FROM designers WHERE email='jane@wemakit.com'),
'inProgress', 'high', NOW(), NOW() + INTERVAL '3 days',
'Create wireframes for the new homepage design');
```

### Database Utilities

The project includes database utility functions in `src/utils/supabase.ts` for interacting with the database. These functions handle both production and demo data scenarios.

---

## Additional Notes

- All profile and dashboard views now show **only first name** for users everywhere.
- The ⌘K keyboard shortcut and icon have been fully removed for all dashboard roles and contexts.
- Messaging to Designers now enabled, and the New Request Client UX boosted for clarity, style, and ease of use.

---

## Database Structure

No major changes are required for the original database structure as provided, but untuk fitur "Message Designer" Anda dapat menambahkan tabel baru seperti berikut—**(optional jika belum ada di struktur Anda):**

```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  project_id UUID REFERENCES projects(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- Kolom `sender_id` dan `receiver_id` bisa mengacu ke `clients` atau `designers` sesuai kebutuhan komunikasi.
- Jika ingin implementasi message, jalankan SQL tersebut di Supabase SQL Editor.

Untuk database setup **tanpa perubahan selain di atas**, silakan ikuti instruksi sebelumnya pada README ini!
Update for redeploy

## Latest Updates (v1.6.0)

### New Features
- **Enhanced Task Assignment Flow**:
  - Admin notifications for new task requests
  - Real-time designer assignment system
  - Task status tracking improvements
  - Notification system for task updates

### Database Updates
```sql
-- New notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  related_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add notification preferences to users table
ALTER TABLE users ADD COLUMN notification_preferences JSONB DEFAULT '{
  "email": true,
  "in_app": true,
  "task_updates": true,
  "new_assignments": true
}'::jsonb;

-- Add notification triggers
CREATE OR REPLACE FUNCTION notify_new_task()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify all admins
  INSERT INTO notifications (user_id, type, title, message, related_id)
  SELECT id, 'new_task', 'New Task Request', 
         'A new task has been created: ' || NEW.title,
         NEW.id
  FROM users WHERE role = 'admin';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_task
  AFTER INSERT ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_task();

CREATE OR REPLACE FUNCTION notify_task_assignment()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify assigned designer
  INSERT INTO notifications (user_id, type, title, message, related_id)
  VALUES (
    NEW.designer_id,
    'task_assigned',
    'New Task Assignment',
    'You have been assigned to: ' || NEW.title,
    NEW.id
  );
  
  -- Notify client
  INSERT INTO notifications (user_id, type, title, message, related_id)
  SELECT client_id, 'designer_assigned',
         'Designer Assigned',
         'A designer has been assigned to your task: ' || NEW.title,
         NEW.id
  FROM tasks WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_task_assignment
  AFTER UPDATE OF designer_id ON tasks
  FOR EACH ROW
  WHEN (NEW.designer_id IS NOT NULL AND OLD.designer_id IS NULL)
  EXECUTE FUNCTION notify_task_assignment();

-- Add comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  attachments TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment notification trigger
CREATE OR REPLACE FUNCTION notify_new_comment()
RETURNS TRIGGER AS $$
DECLARE
  task_title TEXT;
  commenter_name TEXT;
BEGIN
  -- Get task title
  SELECT title INTO task_title FROM tasks WHERE id = NEW.task_id;
  
  -- Get commenter name
  SELECT name INTO commenter_name FROM users WHERE id = NEW.user_id;
  
  -- Notify task owner (client)
  INSERT INTO notifications (user_id, type, title, message, related_id)
  SELECT t.client_id, 'new_comment', 'New Comment',
         commenter_name || ' commented on task: ' || task_title,
         NEW.task_id
  FROM tasks t WHERE t.id = NEW.task_id;
  
  -- If internal comment, notify all team members
  IF NEW.is_internal THEN
    INSERT INTO notifications (user_id, type, title, message, related_id)
    SELECT id, 'new_internal_comment', 'New Internal Comment',
           commenter_name || ' added an internal note to task: ' || task_title,
           NEW.task_id
    FROM users WHERE role IN ('admin', 'designer');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_comment
  AFTER INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_comment();

-- Add file_attachments table
CREATE TABLE file_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  is_design_file BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add file upload notification trigger
CREATE OR REPLACE FUNCTION notify_file_upload()
RETURNS TRIGGER AS $$
DECLARE
  task_title TEXT;
  uploader_name TEXT;
BEGIN
  -- Get task title
  SELECT title INTO task_title FROM tasks WHERE id = NEW.task_id;
  
  -- Get uploader name
  SELECT name INTO uploader_name FROM users WHERE id = NEW.user_id;
  
  -- Notify task owner (client)
  INSERT INTO notifications (user_id, type, title, message, related_id)
  SELECT t.client_id, 'new_file', 'New File Upload',
         uploader_name || ' uploaded a file to task: ' || task_title,
         NEW.task_id
  FROM tasks t WHERE t.id = NEW.task_id;
  
  -- If design file, notify all team members
  IF NEW.is_design_file THEN
    INSERT INTO notifications (user_id, type, title, message, related_id)
    SELECT id, 'new_design_file', 'New Design File',
           uploader_name || ' uploaded a design file to task: ' || task_title,
           NEW.task_id
    FROM users WHERE role IN ('admin', 'designer');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_file_upload
  AFTER INSERT ON file_attachments
  FOR EACH ROW
  EXECUTE FUNCTION notify_file_upload();
```

### Task Assignment Flow
1. Client creates new task
   - Task is created with status 'unassigned'
   - All admins receive notification
   - Task appears in admin's task management dashboard

2. Admin assigns designer
   - Admin selects designer from available pool
   - Designer receives notification
   - Client receives notification
   - Task status updates to 'pending'
   - Designer's active projects count updates

3. Designer accepts task
   - Task status changes to 'in_progress'
   - Client receives notification
   - Task appears in designer's dashboard

### Bug Fixes
- Fixed task assignment notification system
- Improved real-time updates for task status changes
- Enhanced error handling in task creation flow

## Default Login Accounts (for Testing)

Untuk memudahkan testing, berikut contoh akun login default yang bisa Anda tambahkan ke Supabase:

| Role     | Email                | Password   |
|----------|----------------------|------------|
| Admin    | admin@lovable.dev    | password   |
| Client   | client@lovable.dev   | password   |
| Designer | designer@lovable.dev | password   |

**Cara setup:**
1. Daftarkan user baru di halaman signup aplikasi Anda dengan email dan password di atas.
2. Setelah user terdaftar, update role user di tabel `users` (atau `admins`, `clients`, `designers` sesuai struktur Anda) di Supabase agar sesuai dengan role di atas.
3. Pastikan kolom `auth_uid` pada tabel user terkait diisi dengan UID dari Supabase Auth (bisa didapat dari tabel `auth.users`).

**Contoh update di Supabase SQL Editor:**
```sql
-- Update role user
UPDATE users SET role = 'admin' WHERE email = 'admin@wemakit.co';
UPDATE users SET role = 'client' WHERE email = 'client@wemakit.co';
UPDATE users SET role = 'designer' WHERE email = 'designer@wemakit.co';
```

**Catatan:**
- Anda bisa menyesuaikan email/password sesuai kebutuhan.
- Untuk production, hapus akun default ini demi keamanan.

