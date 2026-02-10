# Walkthrough: Odyssey Baths Design Lab

I have restructured the project to support multiple design versions concurrently and integrated real assets.

## New Navigation Structure

- **Main Dashboard (`/`)**: A menu to select which design version to view.
- **Design V1 (`/design-v1`)**: The original "Ethical & Accessible" prototype with **Real Images**.
- **Design V2 (`/design-v2`)**: The 60+ Optimized version with **Real Images**.
    - Simplified Header.
    - Clearer Pricing.
    - High contrast text.
    - "Door Hinge" diagram.
- **Design V3 (`/design-v3`)**: A placeholder for a future concept.

## How to Test

1. Run the server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000).
3. **Check Images**: Navigate to V1 and V2. You should see the actual product photos and diagrams instead of placeholders.
4. **Compare**: Toggle between V1 and V2 to see how the same images look in different layouts.

## Code Organization

- **`app/page.tsx`**: The main dashboard code.
- **`app/design-v1/page.tsx`**: Ethical design code (using `next/image`).
- **`app/design-v2/page.tsx`**: 60+ Optimized design code (using `next/image`).

## Assets
Images are stored in `public/images/` and served automatically.
