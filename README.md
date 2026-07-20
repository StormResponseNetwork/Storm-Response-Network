# Storm Response Network — Version 4 EOC

This is a static GitHub Pages website designed to feel like a mobile Emergency Operations Center.

## Included
- 12 public pages
- EOC dashboard and network statistics
- Current operations banner across every page
- Donation goal and progress bar
- Situation report
- Interactive incident map
- NWS forecast search
- Official weather-resource center
- Storm-report guidance
- Communications center
- SRN Academy
- Disaster Relief Center
- Leadership structure
- Volunteer portal
- Full founder contact information
- Mobile navigation and command-center styling

## Install
1. Extract the ZIP.
2. Upload every extracted file to the ROOT of the existing GitHub repository.
3. Replace the old files when prompted.
4. Keep GitHub Pages set to `main` and `/(root)`.
5. Wait for the Pages deployment to finish.

Do not upload only the ZIP.

## Routine updates
Open `config.js` and edit:
- Operations status and update time
- Current briefing / SITREP
- Donation goal and amount raised
- Statistics
- Incident-map entries
- Contact links

Then upload the updated `config.js` file to GitHub. Most public information updates across the website automatically.

## Operations levels
Suggested `level` values:
- `normal`
- `monitoring`
- `elevated`
- `activated`
- `recovery`

The current design uses green for the public status display. Additional automatic status-color logic can be added later.

## Important technical limits
GitHub Pages is static hosting. It cannot securely provide:
- Password-protected admin accounts
- A private volunteer database
- Automatic Cash App totals
- Direct public file uploads
- A secure dispatch or case-management system
- Real-time server-side alerts

Those features require a backend or content-management service.

## URL
The current project URL will remain:
`https://stormresponsenetwork.github.io/Storm-Response-Network/`

For the shorter free URL:
- Rename or create the repository as `stormresponsenetwork.github.io`
- Publish the site from that repository
- The address becomes `https://stormresponsenetwork.github.io/`

A purchased custom domain can also be connected through Settings → Pages.