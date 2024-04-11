# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.0.0-alpha.5 Unreleased

### Added
- Titles in monitor and geostories pages
- Tooltip update value when the user change date of the layer and the tooltip is already open

### Changed
- Upgrade to Next.js 14.1.4
- Upgrade to Node.js 18.17 required by Next 14.1.4
- Using monitors attribute instead of layers to show monitor details [OEMC-225](https://vizzuality.atlassian.net/browse/OEMC-225)

### Fixed
- Warnings related to image sizes
- Warnings related to ref and dropdowns
- Fixed default layer was not showed in the map navigating monitors [OEMC-216](https://vizzuality.atlassian.net/browse/OEMC-216)
- In homepage the geostories card are displaying the wrong monitor name [OEMC-221](https://vizzuality.atlassian.net/browse/OEMC-221)
- Compare layer should show the correct title in the legend [OEMC-222](https://vizzuality.atlassian.net/browse/OEMC-222)
- Do not show timeline or comparison when is not available in monitors [OEMC-223](https://vizzuality.atlassian.net/browse/OEMC-223)
- Tooltip was not updating value when date changes [OEMC-238](https://vizzuality.atlassian.net/browse/OEMC-238)
- Better performance for opacity slider [OEMC-235](https://vizzuality.atlassian.net/browse/OEMC-235)
- Geolocation position on page loading [OEMC-236](https://vizzuality.atlassian.net/browse/OEMC-236)
- Loading layer from URL

## v1.0.0-alpha.4

### Added
- Added a default env variable for the API_URL
- BaseMap boundaries [OEMC-185](https://vizzuality.atlassian.net/browse/OEMC-185)
- BaseMap labels [OEMC-185](https://vizzuality.atlassian.net/browse/OEMC-185)
- On the geostory page, center the map given bounds from the API [OEMC-190](https://vizzuality.atlassian.net/browse/OEMC-190)
- Added interactivity on the map [OEMC-199](https://vizzuality.atlassian.net/browse/OEMC-199)

## v1.0.0-alpha.3

### Added
- Filter by theme in monitors and geostories [OEMC-26](https://vizzuality.atlassian.net/browse/OEMC-26)
- Icons and colors by theme in monitors and geostories on the landing page
- Added partner link to monitors on the dialog [OEMC-68](https://vizzuality.atlassian.net/browse/OEMC-68)

### Changed
- Removed info button at datasets level [OEMC-69](https://vizzuality.atlassian.net/browse/OEMC-69)
- Geostory info moved from sidebar to geostory dialog [OEMC-163](https://vizzuality.atlassian.net/browse/OEMC-163)
- Ability to filter by multiple categories (themes) in Hub page [OEMC-165](https://vizzuality.atlassian.net/browse/OEMC-165)
- Legend should be visible all time, legend redesign [OEMC-186](https://vizzuality.atlassian.net/browse/OEMC-186)
- Autoplay in monitors removed [OEMC-201](https://vizzuality.atlassian.net/browse/OEMC-201)
- Images in landing page [OEMC-194](https://vizzuality.atlassian.net/browse/OEMC-194)

### Fixed
- Wrong link in geostory card on the landing page
- Fixed pagination
- Removed author from monitor dialog

## v1.0.0-alpha.2

### Added
- Use case links, publications and computational notebooks in geostories [OEMC-43](https://vizzuality.atlassian.net/browse/OEMC-43) [OEMC-34](https://vizzuality.atlassian.net/browse/OEMC-34)
- Geostories enables comparison by default when a left layer exists [OEMC-113](https://vizzuality.atlassian.net/browse/OEMC-113)
- Added metadata link to active geostory on the map page [OEMC-41](https://vizzuality.atlassian.net/browse/OEMC-41)
- Added computational notebook link to active geostory on the map page [OEMC-43](https://vizzuality.atlassian.net/browse/OEMC-43)
- Added related publications to geostories on the map page [OEMC-34](https://vizzuality.atlassian.net/browse/OEMC-34)
- Added related publications to geostories on the landing page [OEMC-32](https://vizzuality.atlassian.net/browse/OEMC-32)
- Added related publications t to geostories and monitors on the map page [OEMC-33](https://vizzuality.atlassian.net/browse/OEMC-33)
- Geostories in the landing page include a link to related publications [OEMC-30](https://vizzuality.atlassian.net/browse/OEMC-30)
- Filtering monitors with layers only in map
- Temporally add monitors with no categories
- Unifying link styles in landing [OEMC-144](https://vizzuality.atlassian.net/browse/OEMC-144)
- Display of monitors and geostories in landing page [OEMC-25](https://vizzuality.atlassian.net/browse/OEMC-25)
- Search monitors and geostories by title [OEMC-94](https://vizzuality.atlassian.net/browse/OEMC-94)
- 404 - error management [OEMC-81](https://vizzuality.atlassian.net/browse/OEMC-81)
- Sorting items in landing page [OEMC-24](https://vizzuality.atlassian.net/browse/OEMC-24)
- Alpha version tag added to site [OEMC-127](https://vizzuality.atlassian.net/browse/OEMC-127)
- Functionality for returning from a geostory to its associated monitor [OEMC-121](https://vizzuality.atlassian.net/browse/OEMC-121)
- Links to social media (twitter, github and linkedin), link to "contact us" and "privacy policy" [OEMC-108](https://vizzuality.atlassian.net/browse/OEMC-108)
- Pagination in monitors and geostories hub [OEMC-20](https://vizzuality.atlassian.net/browse/OEMC-133)
- Show monitors under development [OEMC-149](https://vizzuality.atlassian.net/browse/OEMC-149)

### Changed
- Metadata info in monitors and geostories [OEMC-41](https://vizzuality.atlassian.net/browse/OEMC-41) [OEMC-32](https://vizzuality.atlassian.net/browse/OEMC-32) [OEMC-30](https://vizzuality.atlassian.net/browse/OEMC-30)

## v1.0.0-alpha.1

### Added
- Satoshi Font, main navigation, and test for navigation functionality [OEMC-18](https://vizzuality.atlassian.net/browse/OEMC-18)
- Map set up and layers display [OEMC-23](https://vizzuality.atlassian.net/browse/OEMC-23)
- Map controls to move around the map (zoom in, out, fit bounds)[OEMC-44](https://vizzuality.atlassian.net/browse/OEMC-44)
- Toggle layers displayed on the map [OEMC-58](https://vizzuality.atlassian.net/browse/OEMC-58)
- Datasets display on the map [OECM-62](https://vizzuality.atlassian.net/browse/OEMC-62)
- Dataset info displayed on the sidebar [OEMC-21](https://vizzuality.atlassian.net/browse/OEMC-21)
- Implement monitors directory [OEMC-65](https://vizzuality.atlassian.net/browse/OEMC-65)
- Legend settings (change opacity in layer, layer toggle visibility, remove layer) [OEMC-59](https://vizzuality.atlassian.net/browse/OEMC-59)
- Monitor geostories and datasets for selected geostory displayed on sidebar [OEMC-60](https://vizzuality.atlassian.net/browse/OEMC-60)
- Save bookmarks in map section [OEMC-72](https://vizzuality.atlassian.net/browse/OEMC-72)
- Stadiamaps basemap [OEMC-78](https://vizzuality.atlassian.net/browse/OEMC-78)
- Map view added to URL [OEMC-75](https://vizzuality.atlassian.net/browse/OEMC-75)


### Changed
- Migration from react-map-gl to [openlayers](https://openlayers.org/) [OEMC-85](https://vizzuality.atlassian.net/browse/OEMC-85)


### Fixed
- Layer animation should keep visibility [OEMC-90](https://vizzuality.atlassian.net/browse/OEMC-90)
- Visibility toggle should keep previous opacity value in the layer [OEMC-89](https://vizzuality.atlassian.net/browse/OEMC-89)
