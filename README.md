# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/adb0dded-c2d9-4001-8098-fa7dad4dd3d5

---

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

