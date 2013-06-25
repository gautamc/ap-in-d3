== A District Wise d3.js visualization of Females Per 1000 Males in Andhra Pradesh, India.

= Structure:

    .
    |-- bootstrap
    |   |-- css
    |   |   |-- bootstrap.css
    |   |   |-- bootstrap.min.css
    |   |   |-- bootstrap-responsive.css
    |   |   `-- bootstrap-responsive.min.css
    |   |-- img
    |   |   |-- glyphicons-halflings.png
    |   |   `-- glyphicons-halflings-white.png
    |   `-- js
    |       |-- bootstrap.js
    |       `-- bootstrap.min.js
    |-- css
    |   |-- overrides.css
    |-- gis
    |   |-- Ap-Dist.dbf
    |   |-- ap-dist.json
    |   |-- Ap-Dist.prj
    |   |-- Ap-Dist.qpj
    |   |-- Ap-Dist.shp
    |   |-- Ap-Dist.shx
    |   `-- ap-dist_topo.json
    |-- index.html
    |-- js
    |   |-- ap-d3.js
    |   |-- backbone-min.js
    |   |-- d3.v3.min.js
    |   |-- jquery.min.js
    |   |-- quineloop_utils.js
    |   |-- topojson.v1.min.js
    |   |-- underscore-min.js
    |   `-- underscore.string.min.js
    |-- json
    |   |-- andhra_pradesh_demographics.json
    |   |-- andhra_pradesh_topo.json
    |   `-- ap-dist_topo.json
    |-- README.md

    8 directories, 33 files

= Summary:

* The gis/ Directory contains the shapefile that can be viewed/edited using qgis
* The shapefile is converted to geojson => topojson using the commands `ogr2ogr` and `topojson`

* js/ap-d3.js renders to maps using svg via d3.js.
* http://visualizing.org/visualizations/comparing-district-wise-2001-and-2011-gender-ratios-andhra-pradesh-india