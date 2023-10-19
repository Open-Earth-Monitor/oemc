# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## v0.1.0

Unreleased

### Added
- Satoshi Font, main navigation, and test for navigation functionality [OEMC-18](https://vizzuality.atlassian.net/browse/OEMC-18)
- Map set up and layers display [OEMC-23](https://vizzuality.atlassian.net/jira/software/c/projects/OEMC/boards/95?selectedIssue=OEMC-23)
- Map controls to move around the map (zoom in, out, fit bounds)[OEMC-44](https://vizzuality.atlassian.net/browse/OEMC-44?atlOrigin=eyJpIjoiMGYzNzk5OWQwNmExNDRkNjllOWE5NWMxNjc4MmIwMmQiLCJwIjoiaiJ9)
- Toggle layers displayed on the map [OEMC-58](https://vizzuality.atlassian.net/browse/OEMC-58?atlOrigin=eyJpIjoiMTgyZDgyNzgzNzBhNGMxODljZThjYTk0YTQ3N2VkYzciLCJwIjoiaiJ9)
- Datasets display on the map [OECM-62](https://vizzuality.atlassian.net/browse/OEMC-62?atlOrigin=eyJpIjoiZThhZDBmZTQyYTJiNDM1ZmFmZWI4MzZhNGNjYjkzMWMiLCJwIjoiaiJ9)
- Dataset info displayed on the sidebar [OEMC-21](https://vizzuality.atlassian.net/browse/OEMC-21?atlOrigin=eyJpIjoiZmM3NzkwNjlhMjA0NDUwOWExNDhiOGM0ODMwYTRkZGEiLCJwIjoiaiJ9)
- Implement monitors directory [OEMC-65](https://vizzuality.atlassian.net/browse/OEMC-65?atlOrigin=eyJpIjoiZGZmYjJiNTg1NmY3NDhiM2I5NTNmMWZmMTIwZjA2NDMiLCJwIjoiaiJ9)
- Legend settings (change opacity in layer, layer toggle visibility, remove layer) [OEMC-59](https://vizzuality.atlassian.net/browse/OEMC-59?atlOrigin=eyJpIjoiNDI0NzBkYmExODFmNGVjODllZDk3NTAyNjY4M2YwYzAiLCJwIjoiaiJ9)
- Monitor geostories and datasets for selected geostory displayed on sidebar [OEMC-60](https://vizzuality.atlassian.net/browse/OEMC-60?atlOrigin=eyJpIjoiZjc4YjlhMTUzNTZkNGVmMWFhN2Y0OWI3ZDUyNWM2NDUiLCJwIjoiaiJ9)
- Save bookmarks in map section [OEMC-72](https://vizzuality.atlassian.net/browse/OEMC-72?atlOrigin=eyJpIjoiYzg4MTQ2ZmJjZDQzNDBhMmI5NDg3M2YyZjM0Mzc4ZmUiLCJwIjoiaiJ9)
- Stadiamaps basemap [OEMC-78](https://vizzuality.atlassian.net/browse/OEMC-78?atlOrigin=eyJpIjoiYzUzZmZjMDllNWI2NGY5Y2E1NmUwMmFjYmNhYmU2NjMiLCJwIjoiaiJ9)
- Map view added to URL [OEMC-75](https://vizzuality.atlassian.net/browse/OEMC-75?atlOrigin=eyJpIjoiM2IyNDYxOTJkYzQ0NGY4NTgzOTgyODdkOThiYTJhMjAiLCJwIjoiaiJ9)
- Display of monitors and geostories in landing page [OEMC-25](https://vizzuality.atlassian.net/browse/OEMC-25?atlOrigin=eyJpIjoiNDZiOTM0YjkzN2NlNDJhNmE2OWJiODYxZTlmYzcwNjkiLCJwIjoiaiJ9)

### Changed

- Migration from react-map-gl to [openlayers](https://openlayers.org/) [OEMC-85](https://vizzuality.atlassian.net/browse/OEMC-85?atlOrigin=eyJpIjoiNGU0ZTdlMDY0ZTk0NGQzYTljNjIyMGMwMjNmZDZjOTgiLCJwIjoiaiJ9)


### Fixed

- Layer animation should keep visibility [OEMC-90](https://vizzuality.atlassian.net/browse/OEMC-90?atlOrigin=eyJpIjoiNTM0OWVlYmJmOWE4NDBiM2FjYjY4NGZlZjNiNzM4NjciLCJwIjoiaiJ9)
- Visibility toggle should keep previous opacity value in the layer [OEMC-89](https://vizzuality.atlassian.net/browse/OEMC-89?atlOrigin=eyJpIjoiZDA0ZDIxYzdmNDU0NGExN2EwNzk2MDVkZGQ3NDlhOTciLCJwIjoiaiJ9)

### Removed
