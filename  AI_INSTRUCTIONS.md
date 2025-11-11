# AI Instructions for Debugging and Fixing SaaS Website (Main Branch)

## Project Overview
This project is a multi-platform SaaS website. The codebase is complete, but some functionality has bugs, and some code needs refactoring or optimization.  

Stack:
- Frontend: Next.js + React + TailwindCSS
- Backend: Node.js (Express/Nest.js) or serverless functions
- Database: PostgreSQL / Supabase
- Authentication: Email/password + OAuth
- Payments: Stripe

All work must be committed and pushed to the **main branch** after each fix.

---

## Tasks for AI Agent

### 1. Debug Frontend
- Identify and fix broken pages/components
- Resolve layout and responsiveness issues
- Fix broken links, forms, buttons, or navigation
- Optimize TailwindCSS usage (remove duplicates, simplify classes)
- Check for JS/React console errors and fix them

### 2. Debug Backend / API
- Identify failing endpoints and fix logic errors
- Ensure proper HTTP status codes and error handling
- Validate database queries and connections
- Fix auth and subscription logic as needed
- Verify Stripe integration works correctly

### 3. Refactoring / Optimization
- Remove unused imports and dead code
- Optimize performance-heavy functions
- Ensure proper component reusability
- Add comments where necessary for clarity

### 4. Testing
- Run all API endpoints locally and confirm correct behavior
- Test frontend pages for responsiveness and correctness
- Generate unit tests where missing
- Suggest any edge cases that might fail

### 5. Commit Workflow
- Fix one bug at a time, commit with descriptive message:  
  ```bash
  git add .
  git commit -m "Fix [bug description]"
  git push origin main