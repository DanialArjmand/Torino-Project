<div dir="ltr" align="left">
  <img src="public/images/Torino1.svg" alt="Torino Logo" width="150"/>
  <h1>Torino - Online Travel Agency</h1>
  <p>
    Torino is a modern web application for an online travel agency, allowing users to search, view, and book domestic and international travel tours. The project is built with Next.js for server-side rendering, ensuring a fast and optimized user experience.
  </p>
</div>

[Read in Farsi (فارسی)](./README.fa.md)

## ✨ Features

- **Dynamic Homepage**: Features a main banner, an advanced search section, a tour list, and promotional content.
- **Authentication System**: Secure user login and registration via mobile number and One-Time Password (OTP).
- **Token Management**: Implements `Access Token` and `Refresh Token` strategy for secure session management.
- **Tour Search & Filtering**:
  - Filter tours by **Origin** and **Destination**.
  - Filter by **Date Range** using a Persian (Jalali) calendar.
  - Displays popular cities for quicker access.
- **Tour Details Page**: A dedicated page for each tour with comprehensive information, including price, dates, transportation, capacity, and itinerary.
- **Booking Process**:
  - Booking is restricted to authenticated users.
  - A user-friendly form for passenger information with robust validation.
  - Automatically pre-fills the booking form with the user's profile data.
- **Comprehensive User Profile**:
  - A tabbed dashboard with three main sections: Profile, My Tours, and Transactions.
  - **Profile Tab**: View and edit personal, contact, and bank information.
  - **My Tours Tab**: A list of all purchased tours with their current status (Completed, Ongoing, Upcoming).
  - **Transactions Tab**: A complete history of the user's financial transactions.
- **Modern User Experience**:
  - Fully responsive design.
  - Subtle animations for tour cards on scroll.
  - Toast notifications for user feedback on various actions.
  - Custom pages for `404 Not Found` and server errors.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **State Management & Data Fetching**: [SWR](https://swr.vercel.app/), React Context API
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup)
- **API Communication**: [Axios](https://axios-http.com/) (with interceptors for token refresh)
- **Styling**: CSS Modules, Global CSS
- **UI Components**:
  - `react-multi-date-picker` for the Persian calendar
  - `react-otp-input` for the OTP input field
  - `react-hot-toast` for notifications
  - `react-intersection-observer` for scroll animations
- **Utilities**:
  - `js-cookie` for cookie management

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://your-repository-url.git](https://your-repository-url.git)
    cd torino-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the project root and add your backend API URL:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:6500
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
