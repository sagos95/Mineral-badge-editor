# Minerals Badge Generator

A web application for creating printable mineral badges with names, chemical formulas, descriptions, and locations.

## Features

- Enter mineral information in a structured format
- Support for mineral name, chemical formula, description, and location
- Edit individual mineral badges with a convenient modal interface
- Adjust badge size and font size with sliders
- Generate visual badges for each mineral
- Print the badges for physical labeling
- Responsive design for different screen sizes
- Print-friendly layout
- Automatic saving of your input and settings using localStorage

## How to Use

1. Open `index.html` in any modern web browser
2. Enter mineral information in the text area using the following format:
   - `Name | Formula | Description $ Location`
   - The pipe symbol `|` separates name, formula, and description
   - The dollar sign `$` separates the main information from the location
3. Click the "Generate Badges" button
4. Review the generated badges
5. Click any badge to edit its details
6. Adjust badge size and font size using the sliders as needed
7. Click the "Print Badges" button to print or save as PDF

## Example Input

```
Quartz | SiO₂ | Clear crystal $ Brazil
Amethyst | SiO₂ | Purple variety of quartz $ Uruguay
Diamond | C | Hardest natural material $ South Africa
Ruby | Al₂O₃ | Red variety of corundum $ Myanmar
Emerald | Be₃Al₂(SiO₃)₆ | Green variety of beryl $ Colombia
```

## Customization

You can customize the appearance of the badges by modifying the CSS in the `styles.css` file:

- Change badge dimensions by modifying the `.mineral-badge` width and height
- Adjust colors, fonts, and spacing as needed
- Modify print layout settings in the `@media print` section

## Data Storage

The application automatically saves:
- Your mineral text input
- Badge size settings
- Font size settings

This data is stored in your browser's localStorage, so it will persist between sessions.

## Browser Compatibility

This application works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge