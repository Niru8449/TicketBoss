#  TicketBoss – Event Ticketing API

TicketBoss is a backend API built with **Node.js**, **Express**, and **MongoDB** for real-time event seat reservations using **Optimistic Concurrency Control (OCC)** to prevent overselling.  

---

## Overview

A tech meet-up event in the city has 500 seats.  
External partners can reserve seats instantly — no waiting queues and **no overselling** allowed.  

This API allows partners to:
- Reserve seats (up to 10 per request)
- Cancel reservations
- View event summary (total and available seats)

---

## ⚙️ Setup Instructions

### **1. Prerequisites**
- Node.js (v16 or higher)
- npm (comes with Node)
- MongoDB (local or Atlas)
- MongoDB Compass (optional, for data viewing)

### **2. Clone the repository**
```bash
git clone https://github.com/Niru8449/TicketBoss.git
cd ticketboss-backend
npm install
```

### **3. Create environment file**
```bash

MONGO_URI=mongodb://127.0.0.1:27017/ticketboss
PORT=3000
```

### **4. Run the application**
```bash
   npm run dev
```
