export const MONITOR_GEOSTORIES = {
  count: 1,
  next: 'https://g3w.earthmonitor.org/dev/monitors-and-geostories/?page=2&pagination=true&sort_by=title',
  previous: null,
  results: [
    {
      author: 'Johannes Heisig (jheisig@uni-muenster.de)',
      date_created: '2024-01-01',
      description:
        'Air pollution is a health risk to millions of people in Europe. An indicator for air quality is the concentration of particles with a size of ~10  m (PM10). Heavier pollution occurs in densely populated or industrial areas where we can observe more combustion of fossil fuels. The COVID-19 pandemic made many citizens remain at home when Europe went into lockdown. This sudden decline in demand for transport and industrial production had a positive impact on air quality in many regions. Check out the time series animation of monthly PM10 maps to get insights into air pollution in Europe throughout the years 2019 and 2020. Use the layer compare tool to inspect the differences between single time steps, for example April 2019 vs April 2020.',
      geostory_bbox: null,
      geostory_center: null,
      geostory_zoom: null,
      id: 'g31',
      layers: [
        {
          author: 'ifgi',
          coverage: 'european',
          data_meaning: null,
          description:
            'Interpolated maps of monthly particulate matter 10 measurement data for Europe before and during the onset of the COVID-19 pandemic',
          download_url: 'not intended to be published yet (prototype)',
          filename: 'air_quality.pm10_p90.41_1km_s_.*_eu_epsg.3035_v20240225.tiff',
          geo_story: "COVID-19's Effect on Europe's Air Quality (PM10)",
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:air_quality_pm10',
          gs_style: [
            {
              label: '0 - 20',
              color: '#168130',
            },
            {
              label: '20 - 30',
              color: '#7db72b',
            },
            {
              label: '30 - 40',
              color: '#fdd91d',
            },
            {
              label: '40 - 50',
              color: '#f39a0b',
            },
            {
              label: '50 - 75',
              color: '#ed6c34',
            },
            {
              label: '> 75',
              color: '#8f0f15',
            },
          ],
          layer_id: 'l17',
          license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
          location_query_url: null,
          metadata_url: null,
          monitor: 'Air Quality Monitor',
          monitor_id: 'm11',
          polygon_query_url: null,
          position: 'right',
          range: [
            '20190101_20190131',
            '20190201_20190228',
            '20190301_20190331',
            '20190401_20190430',
            '20190501_20190531',
            '20190601_20190630',
            '20190701_20190731',
            '20190801_20190831',
            '20190901_20190930',
            '20191001_20191031',
            '20191101_20191130',
            '20191201_20191231',
            '20200101_20200131',
            '20200201_20200229',
            '20200301_20200331',
            '20200401_20200430',
            '20200501_20200531',
            '20200601_20200630',
            '20200701_20200731',
            '20200801_20200831',
            '20200901_20200930',
            '20201001_20201031',
            '20201101_20201130',
            '20201201_20201231',
          ],
          range_labels: [
            'Jan 2019',
            'Feb 2019',
            'Mar 2019',
            'Apr 2019',
            'May 2019',
            'Jun 2019',
            'Jul 2019',
            'Aug 2019',
            'Sep 2019',
            'Oct 2019',
            'Nov 2019',
            'Dec 2019',
            'Jan 2020',
            'Feb 2020',
            'Mar 2020',
            'Apr 2020',
            'May 2020',
            'Jun 2020',
            'Jul 2020',
            'Aug 2020',
            'Sep 2020',
            'Oct 2020',
            'Nov 2020',
            'Dec 2020',
          ],
          regex: 'air_quality.pm10_p90.41_1km_s_.*_eu_epsg.3035_v20240225.tiff',
          scale: null,
          srv_path: 'air_quality_pm10/',
          theme: 'Climate & Health',
          title: 'Monthly PM10 Air Quality (2019-2020)',
          unit: 'µg/m³',
          usage_examples: null,
          use_case: 'Air quality assessment at continental scale',
          value_society: null,
          geo_story_id: 'g31',
        },
      ],
      metadata_url: null,
      monitors: [
        {
          id: 'm11',
          title: 'EU-air quality monitor',
        },
      ],
      notebooks_url: null,
      publications: [
        {
          title: null,
          url: null,
        },
      ],
      ready: true,
      theme: 'Climate & Health',
      title: 'Air Quality during COVID-19 (Europe)',
      use_case_link: [
        {
          title: null,
          url: 'https://earthmonitor.org/use-cases/',
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
      ],
      entity_type: 'geo_story',
    },
    {
      author: 'Aleksandar Sekuli? (asekulic@gilab.rs), Milan Kilibarda (mkilibarda@gilab.rs)',
      date_created: null,
      description:
        'Change in max., min., mean temperature, sea-level pressure, and total precipitation across Europe can be analysed at 2 levels:\n1) Annual annual summaries maps are used to detect the changes between two periods\n2) Changes from year to year can be analysed from annual summaries.',
      geostory_bbox: null,
      geostory_center: null,
      geostory_zoom: null,
      id: 'g23',
      layers: [
        {
          author: null,
          coverage: 'European',
          data_meaning:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur, libero vitae pellentesque sodales, urna nibh lobortis nisi, eu ultricies est dolor et tortor.',
          description:
            'European annual long-term means (LTM) maps of maximum temperature at 1 km spatial resolution, for periods 1961-1990 and 1991-2020.',
          download_url: null,
          filename: 'tmax_ltm_ann_*_3035.tif',
          geo_story: 'Climate change (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:eu_ltm_temperature_max',
          gs_style: [
            {
              color: '#30123b',
              label: '&lt;= -183',
            },
            {
              color: '#1b0d27',
              label: '-183 - -180',
            },
            {
              color: '#281744',
              label: '-180 - -177',
            },
            {
              color: '#2e1f57',
              label: '-177 - -174',
            },
            {
              color: '#322667',
              label: '-174 - -171',
            },
            {
              color: '#362c76',
              label: '-171 - -168',
            },
            {
              color: '#393283',
              label: '-168 - -165',
            },
            {
              color: '#3b3990',
              label: '-165 - -162',
            },
            {
              color: '#3d3e9c',
              label: '-162 - -159',
            },
            {
              color: '#3e44a7',
              label: '-159 - -156',
            },
            {
              color: '#404ab1',
              label: '-156 - -153',
            },
            {
              color: '#4150ba',
              label: '-153 - -150',
            },
            {
              color: '#4256c3',
              label: '-150 - -147',
            },
            {
              color: '#435bcc',
              label: '-147 - -144',
            },
            {
              color: '#4461d3',
              label: '-144 - -141',
            },
            {
              color: '#4466da',
              label: '-141 - -138',
            },
            {
              color: '#456ce0',
              label: '-138 - -135',
            },
            {
              color: '#4571e6',
              label: '-135 - -132',
            },
            {
              color: '#4576eb',
              label: '-132 - -129',
            },
            {
              color: '#447cef',
              label: '-129 - -126',
            },
            {
              color: '#4481f3',
              label: '-126 - -123',
            },
            {
              color: '#4486f6',
              label: '-123 - -120',
            },
            {
              color: '#438cf8',
              label: '-120 - -117',
            },
            {
              color: '#4191f9',
              label: '-117 - -114',
            },
            {
              color: '#3e96fa',
              label: '-114 - -111',
            },
            {
              color: '#3b9bf9',
              label: '-111 - -108',
            },
            {
              color: '#38a1f7',
              label: '-108 - -105',
            },
            {
              color: '#35a6f5',
              label: '-105 - -102',
            },
            {
              color: '#31abf2',
              label: '-102 - -99',
            },
            {
              color: '#2eb0ef',
              label: '-99 - -96',
            },
            {
              color: '#2ab6eb',
              label: '-96 - -93',
            },
            {
              color: '#26bbe6',
              label: '-93 - -90',
            },
            {
              color: '#23bfe1',
              label: '-90 - -87',
            },
            {
              color: '#20c4dc',
              label: '-87 - -84',
            },
            {
              color: '#1dc8d7',
              label: '-84 - -81',
            },
            {
              color: '#1bcdd2',
              label: '-81 - -78',
            },
            {
              color: '#19d1cc',
              label: '-78 - -75',
            },
            {
              color: '#18d5c7',
              label: '-75 - -72',
            },
            {
              color: '#18d9c1',
              label: '-72 - -69',
            },
            {
              color: '#18dcbc',
              label: '-69 - -66',
            },
            {
              color: '#19e0b8',
              label: '-66 - -63',
            },
            {
              color: '#1be3b3',
              label: '-63 - -60',
            },
            {
              color: '#1ee6ae',
              label: '-60 - -57',
            },
            {
              color: '#21e8a8',
              label: '-57 - -54',
            },
            {
              color: '#27eba2',
              label: '-54 - -51',
            },
            {
              color: '#2ced9c',
              label: '-51 - -48',
            },
            {
              color: '#32f096',
              label: '-48 - -45',
            },
            {
              color: '#38f28f',
              label: '-45 - -42',
            },
            {
              color: '#40f488',
              label: '-42 - -39',
            },
            {
              color: '#47f581',
              label: '-39 - -36',
            },
            {
              color: '#4ff77a',
              label: '-36 - -33',
            },
            {
              color: '#56f873',
              label: '-33 - -30',
            },
            {
              color: '#5ffa6c',
              label: '-30 - -27',
            },
            {
              color: '#67fb66',
              label: '-27 - -24',
            },
            {
              color: '#6ffc5f',
              label: '-24 - -21',
            },
            {
              color: '#78fc58',
              label: '-21 - -18',
            },
            {
              color: '#7ffd52',
              label: '-18 - -15',
            },
            {
              color: '#87fd4d',
              label: '-15 - -12',
            },
            {
              color: '#8efd48',
              label: '-12 - -9',
            },
            {
              color: '#96fc43',
              label: '-9 - -6',
            },
            {
              color: '#9cfc3f',
              label: '-6 - -3',
            },
            {
              color: '#a1fb3c',
              label: '-3 - 0',
            },
            {
              color: '#a6fa39',
              label: '0 - 3',
            },
            {
              color: '#a8f938',
              label: '3 - 6',
            },
            {
              color: '#acf937',
              label: '6 - 9',
            },
            {
              color: '#aff836',
              label: '9 - 12',
            },
            {
              color: '#b2f636',
              label: '12 - 15',
            },
            {
              color: '#b5f535',
              label: '15 - 18',
            },
            {
              color: '#b8f435',
              label: '18 - 21',
            },
            {
              color: '#bbf334',
              label: '21 - 24',
            },
            {
              color: '#bef234',
              label: '24 - 27',
            },
            {
              color: '#c1f034',
              label: '27 - 30',
            },
            {
              color: '#c4ef34',
              label: '30 - 33',
            },
            {
              color: '#c6ed34',
              label: '33 - 36',
            },
            {
              color: '#caeb34',
              label: '36 - 39',
            },
            {
              color: '#ccea34',
              label: '39 - 42',
            },
            {
              color: '#cfe834',
              label: '42 - 45',
            },
            {
              color: '#d2e635',
              label: '45 - 48',
            },
            {
              color: '#d5e435',
              label: '48 - 51',
            },
            {
              color: '#d7e335',
              label: '51 - 54',
            },
            {
              color: '#dae036',
              label: '54 - 57',
            },
            {
              color: '#dcde37',
              label: '57 - 60',
            },
            {
              color: '#dedd37',
              label: '60 - 63',
            },
            {
              color: '#e1db37',
              label: '63 - 66',
            },
            {
              color: '#e3d838',
              label: '66 - 69',
            },
            {
              color: '#e5d638',
              label: '69 - 72',
            },
            {
              color: '#e7d439',
              label: '72 - 75',
            },
            {
              color: '#ead139',
              label: '75 - 78',
            },
            {
              color: '#ebcf3a',
              label: '78 - 81',
            },
            {
              color: '#edcd3a',
              label: '81 - 84',
            },
            {
              color: '#efca3a',
              label: '84 - 87',
            },
            {
              color: '#f0c83a',
              label: '87 - 90',
            },
            {
              color: '#f2c63a',
              label: '90 - 93',
            },
            {
              color: '#f4c43a',
              label: '93 - 96',
            },
            {
              color: '#f5c13a',
              label: '96 - 99',
            },
            {
              color: '#f6bf39',
              label: '99 - 102',
            },
            {
              color: '#f7bc39',
              label: '102 - 105',
            },
            {
              color: '#f8b939',
              label: '105 - 108',
            },
            {
              color: '#f9b738',
              label: '108 - 111',
            },
            {
              color: '#fab437',
              label: '111 - 114',
            },
            {
              color: '#fab136',
              label: '114 - 117',
            },
            {
              color: '#fbaf35',
              label: '117 - 120',
            },
            {
              color: '#fcac34',
              label: '120 - 123',
            },
            {
              color: '#fca933',
              label: '123 - 126',
            },
            {
              color: '#fda632',
              label: '126 - 129',
            },
            {
              color: '#fda331',
              label: '129 - 132',
            },
            {
              color: '#fd9f2f',
              label: '132 - 135',
            },
            {
              color: '#fd9c2e',
              label: '135 - 138',
            },
            {
              color: '#fd992c',
              label: '138 - 141',
            },
            {
              color: '#fd962b',
              label: '141 - 144',
            },
            {
              color: '#fd932a',
              label: '144 - 147',
            },
            {
              color: '#fc8f28',
              label: '147 - 150',
            },
            {
              color: '#fc8c27',
              label: '150 - 153',
            },
            {
              color: '#fb8825',
              label: '153 - 156',
            },
            {
              color: '#fb8524',
              label: '156 - 159',
            },
            {
              color: '#fa8122',
              label: '159 - 162',
            },
            {
              color: '#fa7e21',
              label: '162 - 165',
            },
            {
              color: '#f97a1f',
              label: '165 - 168',
            },
            {
              color: '#f8771e',
              label: '168 - 171',
            },
            {
              color: '#f7731c',
              label: '171 - 174',
            },
            {
              color: '#f6701b',
              label: '174 - 177',
            },
            {
              color: '#f56c19',
              label: '177 - 180',
            },
            {
              color: '#f46918',
              label: '180 - 183',
            },
            {
              color: '#f36517',
              label: '183 - 186',
            },
            {
              color: '#f26215',
              label: '186 - 189',
            },
            {
              color: '#f05f14',
              label: '189 - 192',
            },
            {
              color: '#ef5c12',
              label: '192 - 195',
            },
            {
              color: '#ee5911',
              label: '195 - 198',
            },
            {
              color: '#ec5510',
              label: '198 - 201',
            },
            {
              color: '#eb520f',
              label: '201 - 204',
            },
            {
              color: '#ea4f0e',
              label: '204 - 207',
            },
            {
              color: '#e84d0d',
              label: '207 - 210',
            },
            {
              color: '#e64a0c',
              label: '210 - 213',
            },
            {
              color: '#e5470b',
              label: '213 - 216',
            },
            {
              color: '#e3450a',
              label: '216 - 219',
            },
            {
              color: '#e1430a',
              label: '219 - 222',
            },
            {
              color: '#e04009',
              label: '222 - 225',
            },
            {
              color: '#dd3e08',
              label: '225 - 228',
            },
            {
              color: '#dc3c07',
              label: '228 - 231',
            },
            {
              color: '#da3907',
              label: '231 - 234',
            },
            {
              color: '#d73706',
              label: '234 - 237',
            },
            {
              color: '#d53506',
              label: '237 - 240',
            },
            {
              color: '#d33305',
              label: '240 - 243',
            },
            {
              color: '#d13005',
              label: '243 - 246',
            },
            {
              color: '#ce2e04',
              label: '246 - 249',
            },
            {
              color: '#cc2c04',
              label: '249 - 252',
            },
            {
              color: '#ca2a04',
              label: '252 - 255',
            },
            {
              color: '#c72803',
              label: '255 - 258',
            },
            {
              color: '#c42603',
              label: '258 - 261',
            },
            {
              color: '#c22403',
              label: '261 - 264',
            },
            {
              color: '#bf2202',
              label: '264 - 267',
            },
            {
              color: '#bc2002',
              label: '267 - 270',
            },
            {
              color: '#b91e02',
              label: '270 - 273',
            },
            {
              color: '#b61d02',
              label: '273 - 276',
            },
            {
              color: '#b31b01',
              label: '276 - 279',
            },
            {
              color: '#b01901',
              label: '279 - 282',
            },
            {
              color: '#ad1801',
              label: '282 - 285',
            },
            {
              color: '#aa1601',
              label: '285 - 288',
            },
            {
              color: '#a71401',
              label: '288 - 291',
            },
            {
              color: '#a41301',
              label: '291 - 294',
            },
            {
              color: '#a01201',
              label: '294 - 297',
            },
            {
              color: '#9d1001',
              label: '297 - 300',
            },
            {
              color: '#990f01',
              label: '300 - 303',
            },
            {
              color: '#960d01',
              label: '303 - 306',
            },
            {
              color: '#920c01',
              label: '306 - 309',
            },
            {
              color: '#8e0a01',
              label: '309 - 312',
            },
            {
              color: '#8a0902',
              label: '312 - 315',
            },
            {
              color: '#870802',
              label: '315 - 318',
            },
            {
              color: '#830702',
              label: '318 - 321',
            },
            {
              color: '#7c0503',
              label: '321 - 324',
            },
            {
              color: '#790403',
              label: '324 - 327',
            },
            {
              color: '#790403',
              label: '327 - 330',
            },
            {
              color: '#7a0403',
              label: '&gt; 330',
            },
          ],
          layer_id: 'l35',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'EU-climate monitor',
          monitor_id: 'm9',
          polygon_query_url: null,
          position: 'right',
          range: ['19611990', '19912020'],
          range_labels: ['1961-1990', '1991-2020'],
          regex: 'tmax_ltm_ann_.*_3035.tif',
          scale: 0.1,
          srv_path: 'eu_ltm_temperature_max/',
          theme: 'Climate & Health',
          title: 'European annual long-term means (LTM) of maximum temperature at 1 km resolution',
          unit: '°C x 10',
          usage_examples:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur, libero vitae pellentesque sodales, urna nibh lobortis nisi, eu ultricies est dolor et tortor.',
          use_case: 'Meteo-based agricultural insurance tool',
          value_society:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur, libero vitae pellentesque sodales, urna nibh lobortis nisi, eu ultricies est dolor et tortor.',
          geo_story_id: 'g23',
        },
        {
          author: null,
          coverage: 'European',
          data_meaning:
            'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
          description:
            'European annual long-term means (LTM) maps of minimum temperature at 1 km spatial resolution, for periods 1961-1990 and 1991-2020.',
          download_url: null,
          filename: 'tmin_ltm_ann_*_3035.tif',
          geo_story: 'Climate change (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:eu_ltm_temperature_min',
          gs_style: [
            {
              color: '#30123b',
              label: '&lt;= -183',
            },
            {
              color: '#1b0d27',
              label: '-183 - -180',
            },
            {
              color: '#281744',
              label: '-180 - -177',
            },
            {
              color: '#2e1f57',
              label: '-177 - -174',
            },
            {
              color: '#322667',
              label: '-174 - -171',
            },
            {
              color: '#362c76',
              label: '-171 - -168',
            },
            {
              color: '#393283',
              label: '-168 - -165',
            },
            {
              color: '#3b3990',
              label: '-165 - -162',
            },
            {
              color: '#3d3e9c',
              label: '-162 - -159',
            },
            {
              color: '#3e44a7',
              label: '-159 - -156',
            },
            {
              color: '#404ab1',
              label: '-156 - -153',
            },
            {
              color: '#4150ba',
              label: '-153 - -150',
            },
            {
              color: '#4256c3',
              label: '-150 - -147',
            },
            {
              color: '#435bcc',
              label: '-147 - -144',
            },
            {
              color: '#4461d3',
              label: '-144 - -141',
            },
            {
              color: '#4466da',
              label: '-141 - -138',
            },
            {
              color: '#456ce0',
              label: '-138 - -135',
            },
            {
              color: '#4571e6',
              label: '-135 - -132',
            },
            {
              color: '#4576eb',
              label: '-132 - -129',
            },
            {
              color: '#447cef',
              label: '-129 - -126',
            },
            {
              color: '#4481f3',
              label: '-126 - -123',
            },
            {
              color: '#4486f6',
              label: '-123 - -120',
            },
            {
              color: '#438cf8',
              label: '-120 - -117',
            },
            {
              color: '#4191f9',
              label: '-117 - -114',
            },
            {
              color: '#3e96fa',
              label: '-114 - -111',
            },
            {
              color: '#3b9bf9',
              label: '-111 - -108',
            },
            {
              color: '#38a1f7',
              label: '-108 - -105',
            },
            {
              color: '#35a6f5',
              label: '-105 - -102',
            },
            {
              color: '#31abf2',
              label: '-102 - -99',
            },
            {
              color: '#2eb0ef',
              label: '-99 - -96',
            },
            {
              color: '#2ab6eb',
              label: '-96 - -93',
            },
            {
              color: '#26bbe6',
              label: '-93 - -90',
            },
            {
              color: '#23bfe1',
              label: '-90 - -87',
            },
            {
              color: '#20c4dc',
              label: '-87 - -84',
            },
            {
              color: '#1dc8d7',
              label: '-84 - -81',
            },
            {
              color: '#1bcdd2',
              label: '-81 - -78',
            },
            {
              color: '#19d1cc',
              label: '-78 - -75',
            },
            {
              color: '#18d5c7',
              label: '-75 - -72',
            },
            {
              color: '#18d9c1',
              label: '-72 - -69',
            },
            {
              color: '#18dcbc',
              label: '-69 - -66',
            },
            {
              color: '#19e0b8',
              label: '-66 - -63',
            },
            {
              color: '#1be3b3',
              label: '-63 - -60',
            },
            {
              color: '#1ee6ae',
              label: '-60 - -57',
            },
            {
              color: '#21e8a8',
              label: '-57 - -54',
            },
            {
              color: '#27eba2',
              label: '-54 - -51',
            },
            {
              color: '#2ced9c',
              label: '-51 - -48',
            },
            {
              color: '#32f096',
              label: '-48 - -45',
            },
            {
              color: '#38f28f',
              label: '-45 - -42',
            },
            {
              color: '#40f488',
              label: '-42 - -39',
            },
            {
              color: '#47f581',
              label: '-39 - -36',
            },
            {
              color: '#4ff77a',
              label: '-36 - -33',
            },
            {
              color: '#56f873',
              label: '-33 - -30',
            },
            {
              color: '#5ffa6c',
              label: '-30 - -27',
            },
            {
              color: '#67fb66',
              label: '-27 - -24',
            },
            {
              color: '#6ffc5f',
              label: '-24 - -21',
            },
            {
              color: '#78fc58',
              label: '-21 - -18',
            },
            {
              color: '#7ffd52',
              label: '-18 - -15',
            },
            {
              color: '#87fd4d',
              label: '-15 - -12',
            },
            {
              color: '#8efd48',
              label: '-12 - -9',
            },
            {
              color: '#96fc43',
              label: '-9 - -6',
            },
            {
              color: '#9cfc3f',
              label: '-6 - -3',
            },
            {
              color: '#a1fb3c',
              label: '-3 - 0',
            },
            {
              color: '#a6fa39',
              label: '0 - 3',
            },
            {
              color: '#a8f938',
              label: '3 - 6',
            },
            {
              color: '#acf937',
              label: '6 - 9',
            },
            {
              color: '#aff836',
              label: '9 - 12',
            },
            {
              color: '#b2f636',
              label: '12 - 15',
            },
            {
              color: '#b5f535',
              label: '15 - 18',
            },
            {
              color: '#b8f435',
              label: '18 - 21',
            },
            {
              color: '#bbf334',
              label: '21 - 24',
            },
            {
              color: '#bef234',
              label: '24 - 27',
            },
            {
              color: '#c1f034',
              label: '27 - 30',
            },
            {
              color: '#c4ef34',
              label: '30 - 33',
            },
            {
              color: '#c6ed34',
              label: '33 - 36',
            },
            {
              color: '#caeb34',
              label: '36 - 39',
            },
            {
              color: '#ccea34',
              label: '39 - 42',
            },
            {
              color: '#cfe834',
              label: '42 - 45',
            },
            {
              color: '#d2e635',
              label: '45 - 48',
            },
            {
              color: '#d5e435',
              label: '48 - 51',
            },
            {
              color: '#d7e335',
              label: '51 - 54',
            },
            {
              color: '#dae036',
              label: '54 - 57',
            },
            {
              color: '#dcde37',
              label: '57 - 60',
            },
            {
              color: '#dedd37',
              label: '60 - 63',
            },
            {
              color: '#e1db37',
              label: '63 - 66',
            },
            {
              color: '#e3d838',
              label: '66 - 69',
            },
            {
              color: '#e5d638',
              label: '69 - 72',
            },
            {
              color: '#e7d439',
              label: '72 - 75',
            },
            {
              color: '#ead139',
              label: '75 - 78',
            },
            {
              color: '#ebcf3a',
              label: '78 - 81',
            },
            {
              color: '#edcd3a',
              label: '81 - 84',
            },
            {
              color: '#efca3a',
              label: '84 - 87',
            },
            {
              color: '#f0c83a',
              label: '87 - 90',
            },
            {
              color: '#f2c63a',
              label: '90 - 93',
            },
            {
              color: '#f4c43a',
              label: '93 - 96',
            },
            {
              color: '#f5c13a',
              label: '96 - 99',
            },
            {
              color: '#f6bf39',
              label: '99 - 102',
            },
            {
              color: '#f7bc39',
              label: '102 - 105',
            },
            {
              color: '#f8b939',
              label: '105 - 108',
            },
            {
              color: '#f9b738',
              label: '108 - 111',
            },
            {
              color: '#fab437',
              label: '111 - 114',
            },
            {
              color: '#fab136',
              label: '114 - 117',
            },
            {
              color: '#fbaf35',
              label: '117 - 120',
            },
            {
              color: '#fcac34',
              label: '120 - 123',
            },
            {
              color: '#fca933',
              label: '123 - 126',
            },
            {
              color: '#fda632',
              label: '126 - 129',
            },
            {
              color: '#fda331',
              label: '129 - 132',
            },
            {
              color: '#fd9f2f',
              label: '132 - 135',
            },
            {
              color: '#fd9c2e',
              label: '135 - 138',
            },
            {
              color: '#fd992c',
              label: '138 - 141',
            },
            {
              color: '#fd962b',
              label: '141 - 144',
            },
            {
              color: '#fd932a',
              label: '144 - 147',
            },
            {
              color: '#fc8f28',
              label: '147 - 150',
            },
            {
              color: '#fc8c27',
              label: '150 - 153',
            },
            {
              color: '#fb8825',
              label: '153 - 156',
            },
            {
              color: '#fb8524',
              label: '156 - 159',
            },
            {
              color: '#fa8122',
              label: '159 - 162',
            },
            {
              color: '#fa7e21',
              label: '162 - 165',
            },
            {
              color: '#f97a1f',
              label: '165 - 168',
            },
            {
              color: '#f8771e',
              label: '168 - 171',
            },
            {
              color: '#f7731c',
              label: '171 - 174',
            },
            {
              color: '#f6701b',
              label: '174 - 177',
            },
            {
              color: '#f56c19',
              label: '177 - 180',
            },
            {
              color: '#f46918',
              label: '180 - 183',
            },
            {
              color: '#f36517',
              label: '183 - 186',
            },
            {
              color: '#f26215',
              label: '186 - 189',
            },
            {
              color: '#f05f14',
              label: '189 - 192',
            },
            {
              color: '#ef5c12',
              label: '192 - 195',
            },
            {
              color: '#ee5911',
              label: '195 - 198',
            },
            {
              color: '#ec5510',
              label: '198 - 201',
            },
            {
              color: '#eb520f',
              label: '201 - 204',
            },
            {
              color: '#ea4f0e',
              label: '204 - 207',
            },
            {
              color: '#e84d0d',
              label: '207 - 210',
            },
            {
              color: '#e64a0c',
              label: '210 - 213',
            },
            {
              color: '#e5470b',
              label: '213 - 216',
            },
            {
              color: '#e3450a',
              label: '216 - 219',
            },
            {
              color: '#e1430a',
              label: '219 - 222',
            },
            {
              color: '#e04009',
              label: '222 - 225',
            },
            {
              color: '#dd3e08',
              label: '225 - 228',
            },
            {
              color: '#dc3c07',
              label: '228 - 231',
            },
            {
              color: '#da3907',
              label: '231 - 234',
            },
            {
              color: '#d73706',
              label: '234 - 237',
            },
            {
              color: '#d53506',
              label: '237 - 240',
            },
            {
              color: '#d33305',
              label: '240 - 243',
            },
            {
              color: '#d13005',
              label: '243 - 246',
            },
            {
              color: '#ce2e04',
              label: '246 - 249',
            },
            {
              color: '#cc2c04',
              label: '249 - 252',
            },
            {
              color: '#ca2a04',
              label: '252 - 255',
            },
            {
              color: '#c72803',
              label: '255 - 258',
            },
            {
              color: '#c42603',
              label: '258 - 261',
            },
            {
              color: '#c22403',
              label: '261 - 264',
            },
            {
              color: '#bf2202',
              label: '264 - 267',
            },
            {
              color: '#bc2002',
              label: '267 - 270',
            },
            {
              color: '#b91e02',
              label: '270 - 273',
            },
            {
              color: '#b61d02',
              label: '273 - 276',
            },
            {
              color: '#b31b01',
              label: '276 - 279',
            },
            {
              color: '#b01901',
              label: '279 - 282',
            },
            {
              color: '#ad1801',
              label: '282 - 285',
            },
            {
              color: '#aa1601',
              label: '285 - 288',
            },
            {
              color: '#a71401',
              label: '288 - 291',
            },
            {
              color: '#a41301',
              label: '291 - 294',
            },
            {
              color: '#a01201',
              label: '294 - 297',
            },
            {
              color: '#9d1001',
              label: '297 - 300',
            },
            {
              color: '#990f01',
              label: '300 - 303',
            },
            {
              color: '#960d01',
              label: '303 - 306',
            },
            {
              color: '#920c01',
              label: '306 - 309',
            },
            {
              color: '#8e0a01',
              label: '309 - 312',
            },
            {
              color: '#8a0902',
              label: '312 - 315',
            },
            {
              color: '#870802',
              label: '315 - 318',
            },
            {
              color: '#830702',
              label: '318 - 321',
            },
            {
              color: '#7c0503',
              label: '321 - 324',
            },
            {
              color: '#790403',
              label: '324 - 327',
            },
            {
              color: '#790403',
              label: '327 - 330',
            },
            {
              color: '#7a0403',
              label: '&gt; 330',
            },
          ],
          layer_id: 'l36',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'EU-climate monitor',
          monitor_id: 'm9',
          polygon_query_url: null,
          position: 'right',
          range: ['19611990', '19912020'],
          range_labels: ['1961-1990', '1991-2020'],
          regex: 'tmin_ltm_ann_.*_3035.tif',
          scale: 0.1,
          srv_path: 'eu_ltm_temperature_min/',
          theme: 'Climate & Health',
          title: 'European annual long-term means (LTM) of minimum temperature at 1 km resolution',
          unit: '°C x 10',
          usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
          use_case: 'Meteo-based agricultural insurance tool',
          value_society: 'Morbi eget lacus nulla.',
          geo_story_id: 'g23',
        },
        {
          author: null,
          coverage: 'European',
          data_meaning:
            'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
          description:
            'European annual long-term means (LTM) maps of mean temperature at 1 km spatial resolution, for periods 1961-1990 and 1991-2020.',
          download_url: null,
          filename: 'tmean_ltm_ann_*_3035.tif',
          geo_story: 'Climate change (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:eu_ltm_temperature_mean',
          gs_style: [
            {
              color: '#30123b',
              label: '&lt;= -183',
            },
            {
              color: '#1b0d27',
              label: '-183 - -180',
            },
            {
              color: '#281744',
              label: '-180 - -177',
            },
            {
              color: '#2e1f57',
              label: '-177 - -174',
            },
            {
              color: '#322667',
              label: '-174 - -171',
            },
            {
              color: '#362c76',
              label: '-171 - -168',
            },
            {
              color: '#393283',
              label: '-168 - -165',
            },
            {
              color: '#3b3990',
              label: '-165 - -162',
            },
            {
              color: '#3d3e9c',
              label: '-162 - -159',
            },
            {
              color: '#3e44a7',
              label: '-159 - -156',
            },
            {
              color: '#404ab1',
              label: '-156 - -153',
            },
            {
              color: '#4150ba',
              label: '-153 - -150',
            },
            {
              color: '#4256c3',
              label: '-150 - -147',
            },
            {
              color: '#435bcc',
              label: '-147 - -144',
            },
            {
              color: '#4461d3',
              label: '-144 - -141',
            },
            {
              color: '#4466da',
              label: '-141 - -138',
            },
            {
              color: '#456ce0',
              label: '-138 - -135',
            },
            {
              color: '#4571e6',
              label: '-135 - -132',
            },
            {
              color: '#4576eb',
              label: '-132 - -129',
            },
            {
              color: '#447cef',
              label: '-129 - -126',
            },
            {
              color: '#4481f3',
              label: '-126 - -123',
            },
            {
              color: '#4486f6',
              label: '-123 - -120',
            },
            {
              color: '#438cf8',
              label: '-120 - -117',
            },
            {
              color: '#4191f9',
              label: '-117 - -114',
            },
            {
              color: '#3e96fa',
              label: '-114 - -111',
            },
            {
              color: '#3b9bf9',
              label: '-111 - -108',
            },
            {
              color: '#38a1f7',
              label: '-108 - -105',
            },
            {
              color: '#35a6f5',
              label: '-105 - -102',
            },
            {
              color: '#31abf2',
              label: '-102 - -99',
            },
            {
              color: '#2eb0ef',
              label: '-99 - -96',
            },
            {
              color: '#2ab6eb',
              label: '-96 - -93',
            },
            {
              color: '#26bbe6',
              label: '-93 - -90',
            },
            {
              color: '#23bfe1',
              label: '-90 - -87',
            },
            {
              color: '#20c4dc',
              label: '-87 - -84',
            },
            {
              color: '#1dc8d7',
              label: '-84 - -81',
            },
            {
              color: '#1bcdd2',
              label: '-81 - -78',
            },
            {
              color: '#19d1cc',
              label: '-78 - -75',
            },
            {
              color: '#18d5c7',
              label: '-75 - -72',
            },
            {
              color: '#18d9c1',
              label: '-72 - -69',
            },
            {
              color: '#18dcbc',
              label: '-69 - -66',
            },
            {
              color: '#19e0b8',
              label: '-66 - -63',
            },
            {
              color: '#1be3b3',
              label: '-63 - -60',
            },
            {
              color: '#1ee6ae',
              label: '-60 - -57',
            },
            {
              color: '#21e8a8',
              label: '-57 - -54',
            },
            {
              color: '#27eba2',
              label: '-54 - -51',
            },
            {
              color: '#2ced9c',
              label: '-51 - -48',
            },
            {
              color: '#32f096',
              label: '-48 - -45',
            },
            {
              color: '#38f28f',
              label: '-45 - -42',
            },
            {
              color: '#40f488',
              label: '-42 - -39',
            },
            {
              color: '#47f581',
              label: '-39 - -36',
            },
            {
              color: '#4ff77a',
              label: '-36 - -33',
            },
            {
              color: '#56f873',
              label: '-33 - -30',
            },
            {
              color: '#5ffa6c',
              label: '-30 - -27',
            },
            {
              color: '#67fb66',
              label: '-27 - -24',
            },
            {
              color: '#6ffc5f',
              label: '-24 - -21',
            },
            {
              color: '#78fc58',
              label: '-21 - -18',
            },
            {
              color: '#7ffd52',
              label: '-18 - -15',
            },
            {
              color: '#87fd4d',
              label: '-15 - -12',
            },
            {
              color: '#8efd48',
              label: '-12 - -9',
            },
            {
              color: '#96fc43',
              label: '-9 - -6',
            },
            {
              color: '#9cfc3f',
              label: '-6 - -3',
            },
            {
              color: '#a1fb3c',
              label: '-3 - 0',
            },
            {
              color: '#a6fa39',
              label: '0 - 3',
            },
            {
              color: '#a8f938',
              label: '3 - 6',
            },
            {
              color: '#acf937',
              label: '6 - 9',
            },
            {
              color: '#aff836',
              label: '9 - 12',
            },
            {
              color: '#b2f636',
              label: '12 - 15',
            },
            {
              color: '#b5f535',
              label: '15 - 18',
            },
            {
              color: '#b8f435',
              label: '18 - 21',
            },
            {
              color: '#bbf334',
              label: '21 - 24',
            },
            {
              color: '#bef234',
              label: '24 - 27',
            },
            {
              color: '#c1f034',
              label: '27 - 30',
            },
            {
              color: '#c4ef34',
              label: '30 - 33',
            },
            {
              color: '#c6ed34',
              label: '33 - 36',
            },
            {
              color: '#caeb34',
              label: '36 - 39',
            },
            {
              color: '#ccea34',
              label: '39 - 42',
            },
            {
              color: '#cfe834',
              label: '42 - 45',
            },
            {
              color: '#d2e635',
              label: '45 - 48',
            },
            {
              color: '#d5e435',
              label: '48 - 51',
            },
            {
              color: '#d7e335',
              label: '51 - 54',
            },
            {
              color: '#dae036',
              label: '54 - 57',
            },
            {
              color: '#dcde37',
              label: '57 - 60',
            },
            {
              color: '#dedd37',
              label: '60 - 63',
            },
            {
              color: '#e1db37',
              label: '63 - 66',
            },
            {
              color: '#e3d838',
              label: '66 - 69',
            },
            {
              color: '#e5d638',
              label: '69 - 72',
            },
            {
              color: '#e7d439',
              label: '72 - 75',
            },
            {
              color: '#ead139',
              label: '75 - 78',
            },
            {
              color: '#ebcf3a',
              label: '78 - 81',
            },
            {
              color: '#edcd3a',
              label: '81 - 84',
            },
            {
              color: '#efca3a',
              label: '84 - 87',
            },
            {
              color: '#f0c83a',
              label: '87 - 90',
            },
            {
              color: '#f2c63a',
              label: '90 - 93',
            },
            {
              color: '#f4c43a',
              label: '93 - 96',
            },
            {
              color: '#f5c13a',
              label: '96 - 99',
            },
            {
              color: '#f6bf39',
              label: '99 - 102',
            },
            {
              color: '#f7bc39',
              label: '102 - 105',
            },
            {
              color: '#f8b939',
              label: '105 - 108',
            },
            {
              color: '#f9b738',
              label: '108 - 111',
            },
            {
              color: '#fab437',
              label: '111 - 114',
            },
            {
              color: '#fab136',
              label: '114 - 117',
            },
            {
              color: '#fbaf35',
              label: '117 - 120',
            },
            {
              color: '#fcac34',
              label: '120 - 123',
            },
            {
              color: '#fca933',
              label: '123 - 126',
            },
            {
              color: '#fda632',
              label: '126 - 129',
            },
            {
              color: '#fda331',
              label: '129 - 132',
            },
            {
              color: '#fd9f2f',
              label: '132 - 135',
            },
            {
              color: '#fd9c2e',
              label: '135 - 138',
            },
            {
              color: '#fd992c',
              label: '138 - 141',
            },
            {
              color: '#fd962b',
              label: '141 - 144',
            },
            {
              color: '#fd932a',
              label: '144 - 147',
            },
            {
              color: '#fc8f28',
              label: '147 - 150',
            },
            {
              color: '#fc8c27',
              label: '150 - 153',
            },
            {
              color: '#fb8825',
              label: '153 - 156',
            },
            {
              color: '#fb8524',
              label: '156 - 159',
            },
            {
              color: '#fa8122',
              label: '159 - 162',
            },
            {
              color: '#fa7e21',
              label: '162 - 165',
            },
            {
              color: '#f97a1f',
              label: '165 - 168',
            },
            {
              color: '#f8771e',
              label: '168 - 171',
            },
            {
              color: '#f7731c',
              label: '171 - 174',
            },
            {
              color: '#f6701b',
              label: '174 - 177',
            },
            {
              color: '#f56c19',
              label: '177 - 180',
            },
            {
              color: '#f46918',
              label: '180 - 183',
            },
            {
              color: '#f36517',
              label: '183 - 186',
            },
            {
              color: '#f26215',
              label: '186 - 189',
            },
            {
              color: '#f05f14',
              label: '189 - 192',
            },
            {
              color: '#ef5c12',
              label: '192 - 195',
            },
            {
              color: '#ee5911',
              label: '195 - 198',
            },
            {
              color: '#ec5510',
              label: '198 - 201',
            },
            {
              color: '#eb520f',
              label: '201 - 204',
            },
            {
              color: '#ea4f0e',
              label: '204 - 207',
            },
            {
              color: '#e84d0d',
              label: '207 - 210',
            },
            {
              color: '#e64a0c',
              label: '210 - 213',
            },
            {
              color: '#e5470b',
              label: '213 - 216',
            },
            {
              color: '#e3450a',
              label: '216 - 219',
            },
            {
              color: '#e1430a',
              label: '219 - 222',
            },
            {
              color: '#e04009',
              label: '222 - 225',
            },
            {
              color: '#dd3e08',
              label: '225 - 228',
            },
            {
              color: '#dc3c07',
              label: '228 - 231',
            },
            {
              color: '#da3907',
              label: '231 - 234',
            },
            {
              color: '#d73706',
              label: '234 - 237',
            },
            {
              color: '#d53506',
              label: '237 - 240',
            },
            {
              color: '#d33305',
              label: '240 - 243',
            },
            {
              color: '#d13005',
              label: '243 - 246',
            },
            {
              color: '#ce2e04',
              label: '246 - 249',
            },
            {
              color: '#cc2c04',
              label: '249 - 252',
            },
            {
              color: '#ca2a04',
              label: '252 - 255',
            },
            {
              color: '#c72803',
              label: '255 - 258',
            },
            {
              color: '#c42603',
              label: '258 - 261',
            },
            {
              color: '#c22403',
              label: '261 - 264',
            },
            {
              color: '#bf2202',
              label: '264 - 267',
            },
            {
              color: '#bc2002',
              label: '267 - 270',
            },
            {
              color: '#b91e02',
              label: '270 - 273',
            },
            {
              color: '#b61d02',
              label: '273 - 276',
            },
            {
              color: '#b31b01',
              label: '276 - 279',
            },
            {
              color: '#b01901',
              label: '279 - 282',
            },
            {
              color: '#ad1801',
              label: '282 - 285',
            },
            {
              color: '#aa1601',
              label: '285 - 288',
            },
            {
              color: '#a71401',
              label: '288 - 291',
            },
            {
              color: '#a41301',
              label: '291 - 294',
            },
            {
              color: '#a01201',
              label: '294 - 297',
            },
            {
              color: '#9d1001',
              label: '297 - 300',
            },
            {
              color: '#990f01',
              label: '300 - 303',
            },
            {
              color: '#960d01',
              label: '303 - 306',
            },
            {
              color: '#920c01',
              label: '306 - 309',
            },
            {
              color: '#8e0a01',
              label: '309 - 312',
            },
            {
              color: '#8a0902',
              label: '312 - 315',
            },
            {
              color: '#870802',
              label: '315 - 318',
            },
            {
              color: '#830702',
              label: '318 - 321',
            },
            {
              color: '#7c0503',
              label: '321 - 324',
            },
            {
              color: '#790403',
              label: '324 - 327',
            },
            {
              color: '#790403',
              label: '327 - 330',
            },
            {
              color: '#7a0403',
              label: '&gt; 330',
            },
          ],
          layer_id: 'l37',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'EU-climate monitor',
          monitor_id: 'm9',
          polygon_query_url: null,
          position: 'right',
          range: ['19611990', '19912020'],
          range_labels: ['1961-1990', '1991-2020'],
          regex: 'tmean_ltm_ann_.*_3035.tif',
          scale: 0.1,
          srv_path: 'eu_ltm_temperature_mean/',
          theme: 'Climate & Health',
          title: 'European annual long-term means (LTM) of mean temperature at 1 km resolution',
          unit: '°C x 10',
          usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
          use_case: 'Meteo-based agricultural insurance tool',
          value_society: 'Morbi eget lacus nulla.',
          geo_story_id: 'g23',
        },
        {
          author: null,
          coverage: 'European',
          data_meaning:
            'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
          description:
            'European annual average maps of maximum temperature at 1 km spatial resolution, for the period 1961-2020.',
          download_url: null,
          filename: 'tmax_ann_*_3035.tif',
          geo_story: 'Climate change (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:eu_agg_ann_temperature_max',
          gs_style: [
            {
              color: '#30123b',
              label: '&lt;= -183',
            },
            {
              color: '#1b0d27',
              label: '-183 - -180',
            },
            {
              color: '#281744',
              label: '-180 - -177',
            },
            {
              color: '#2e1f57',
              label: '-177 - -174',
            },
            {
              color: '#322667',
              label: '-174 - -171',
            },
            {
              color: '#362c76',
              label: '-171 - -168',
            },
            {
              color: '#393283',
              label: '-168 - -165',
            },
            {
              color: '#3b3990',
              label: '-165 - -162',
            },
            {
              color: '#3d3e9c',
              label: '-162 - -159',
            },
            {
              color: '#3e44a7',
              label: '-159 - -156',
            },
            {
              color: '#404ab1',
              label: '-156 - -153',
            },
            {
              color: '#4150ba',
              label: '-153 - -150',
            },
            {
              color: '#4256c3',
              label: '-150 - -147',
            },
            {
              color: '#435bcc',
              label: '-147 - -144',
            },
            {
              color: '#4461d3',
              label: '-144 - -141',
            },
            {
              color: '#4466da',
              label: '-141 - -138',
            },
            {
              color: '#456ce0',
              label: '-138 - -135',
            },
            {
              color: '#4571e6',
              label: '-135 - -132',
            },
            {
              color: '#4576eb',
              label: '-132 - -129',
            },
            {
              color: '#447cef',
              label: '-129 - -126',
            },
            {
              color: '#4481f3',
              label: '-126 - -123',
            },
            {
              color: '#4486f6',
              label: '-123 - -120',
            },
            {
              color: '#438cf8',
              label: '-120 - -117',
            },
            {
              color: '#4191f9',
              label: '-117 - -114',
            },
            {
              color: '#3e96fa',
              label: '-114 - -111',
            },
            {
              color: '#3b9bf9',
              label: '-111 - -108',
            },
            {
              color: '#38a1f7',
              label: '-108 - -105',
            },
            {
              color: '#35a6f5',
              label: '-105 - -102',
            },
            {
              color: '#31abf2',
              label: '-102 - -99',
            },
            {
              color: '#2eb0ef',
              label: '-99 - -96',
            },
            {
              color: '#2ab6eb',
              label: '-96 - -93',
            },
            {
              color: '#26bbe6',
              label: '-93 - -90',
            },
            {
              color: '#23bfe1',
              label: '-90 - -87',
            },
            {
              color: '#20c4dc',
              label: '-87 - -84',
            },
            {
              color: '#1dc8d7',
              label: '-84 - -81',
            },
            {
              color: '#1bcdd2',
              label: '-81 - -78',
            },
            {
              color: '#19d1cc',
              label: '-78 - -75',
            },
            {
              color: '#18d5c7',
              label: '-75 - -72',
            },
            {
              color: '#18d9c1',
              label: '-72 - -69',
            },
            {
              color: '#18dcbc',
              label: '-69 - -66',
            },
            {
              color: '#19e0b8',
              label: '-66 - -63',
            },
            {
              color: '#1be3b3',
              label: '-63 - -60',
            },
            {
              color: '#1ee6ae',
              label: '-60 - -57',
            },
            {
              color: '#21e8a8',
              label: '-57 - -54',
            },
            {
              color: '#27eba2',
              label: '-54 - -51',
            },
            {
              color: '#2ced9c',
              label: '-51 - -48',
            },
            {
              color: '#32f096',
              label: '-48 - -45',
            },
            {
              color: '#38f28f',
              label: '-45 - -42',
            },
            {
              color: '#40f488',
              label: '-42 - -39',
            },
            {
              color: '#47f581',
              label: '-39 - -36',
            },
            {
              color: '#4ff77a',
              label: '-36 - -33',
            },
            {
              color: '#56f873',
              label: '-33 - -30',
            },
            {
              color: '#5ffa6c',
              label: '-30 - -27',
            },
            {
              color: '#67fb66',
              label: '-27 - -24',
            },
            {
              color: '#6ffc5f',
              label: '-24 - -21',
            },
            {
              color: '#78fc58',
              label: '-21 - -18',
            },
            {
              color: '#7ffd52',
              label: '-18 - -15',
            },
            {
              color: '#87fd4d',
              label: '-15 - -12',
            },
            {
              color: '#8efd48',
              label: '-12 - -9',
            },
            {
              color: '#96fc43',
              label: '-9 - -6',
            },
            {
              color: '#9cfc3f',
              label: '-6 - -3',
            },
            {
              color: '#a1fb3c',
              label: '-3 - 0',
            },
            {
              color: '#a6fa39',
              label: '0 - 3',
            },
            {
              color: '#a8f938',
              label: '3 - 6',
            },
            {
              color: '#acf937',
              label: '6 - 9',
            },
            {
              color: '#aff836',
              label: '9 - 12',
            },
            {
              color: '#b2f636',
              label: '12 - 15',
            },
            {
              color: '#b5f535',
              label: '15 - 18',
            },
            {
              color: '#b8f435',
              label: '18 - 21',
            },
            {
              color: '#bbf334',
              label: '21 - 24',
            },
            {
              color: '#bef234',
              label: '24 - 27',
            },
            {
              color: '#c1f034',
              label: '27 - 30',
            },
            {
              color: '#c4ef34',
              label: '30 - 33',
            },
            {
              color: '#c6ed34',
              label: '33 - 36',
            },
            {
              color: '#caeb34',
              label: '36 - 39',
            },
            {
              color: '#ccea34',
              label: '39 - 42',
            },
            {
              color: '#cfe834',
              label: '42 - 45',
            },
            {
              color: '#d2e635',
              label: '45 - 48',
            },
            {
              color: '#d5e435',
              label: '48 - 51',
            },
            {
              color: '#d7e335',
              label: '51 - 54',
            },
            {
              color: '#dae036',
              label: '54 - 57',
            },
            {
              color: '#dcde37',
              label: '57 - 60',
            },
            {
              color: '#dedd37',
              label: '60 - 63',
            },
            {
              color: '#e1db37',
              label: '63 - 66',
            },
            {
              color: '#e3d838',
              label: '66 - 69',
            },
            {
              color: '#e5d638',
              label: '69 - 72',
            },
            {
              color: '#e7d439',
              label: '72 - 75',
            },
            {
              color: '#ead139',
              label: '75 - 78',
            },
            {
              color: '#ebcf3a',
              label: '78 - 81',
            },
            {
              color: '#edcd3a',
              label: '81 - 84',
            },
            {
              color: '#efca3a',
              label: '84 - 87',
            },
            {
              color: '#f0c83a',
              label: '87 - 90',
            },
            {
              color: '#f2c63a',
              label: '90 - 93',
            },
            {
              color: '#f4c43a',
              label: '93 - 96',
            },
            {
              color: '#f5c13a',
              label: '96 - 99',
            },
            {
              color: '#f6bf39',
              label: '99 - 102',
            },
            {
              color: '#f7bc39',
              label: '102 - 105',
            },
            {
              color: '#f8b939',
              label: '105 - 108',
            },
            {
              color: '#f9b738',
              label: '108 - 111',
            },
            {
              color: '#fab437',
              label: '111 - 114',
            },
            {
              color: '#fab136',
              label: '114 - 117',
            },
            {
              color: '#fbaf35',
              label: '117 - 120',
            },
            {
              color: '#fcac34',
              label: '120 - 123',
            },
            {
              color: '#fca933',
              label: '123 - 126',
            },
            {
              color: '#fda632',
              label: '126 - 129',
            },
            {
              color: '#fda331',
              label: '129 - 132',
            },
            {
              color: '#fd9f2f',
              label: '132 - 135',
            },
            {
              color: '#fd9c2e',
              label: '135 - 138',
            },
            {
              color: '#fd992c',
              label: '138 - 141',
            },
            {
              color: '#fd962b',
              label: '141 - 144',
            },
            {
              color: '#fd932a',
              label: '144 - 147',
            },
            {
              color: '#fc8f28',
              label: '147 - 150',
            },
            {
              color: '#fc8c27',
              label: '150 - 153',
            },
            {
              color: '#fb8825',
              label: '153 - 156',
            },
            {
              color: '#fb8524',
              label: '156 - 159',
            },
            {
              color: '#fa8122',
              label: '159 - 162',
            },
            {
              color: '#fa7e21',
              label: '162 - 165',
            },
            {
              color: '#f97a1f',
              label: '165 - 168',
            },
            {
              color: '#f8771e',
              label: '168 - 171',
            },
            {
              color: '#f7731c',
              label: '171 - 174',
            },
            {
              color: '#f6701b',
              label: '174 - 177',
            },
            {
              color: '#f56c19',
              label: '177 - 180',
            },
            {
              color: '#f46918',
              label: '180 - 183',
            },
            {
              color: '#f36517',
              label: '183 - 186',
            },
            {
              color: '#f26215',
              label: '186 - 189',
            },
            {
              color: '#f05f14',
              label: '189 - 192',
            },
            {
              color: '#ef5c12',
              label: '192 - 195',
            },
            {
              color: '#ee5911',
              label: '195 - 198',
            },
            {
              color: '#ec5510',
              label: '198 - 201',
            },
            {
              color: '#eb520f',
              label: '201 - 204',
            },
            {
              color: '#ea4f0e',
              label: '204 - 207',
            },
            {
              color: '#e84d0d',
              label: '207 - 210',
            },
            {
              color: '#e64a0c',
              label: '210 - 213',
            },
            {
              color: '#e5470b',
              label: '213 - 216',
            },
            {
              color: '#e3450a',
              label: '216 - 219',
            },
            {
              color: '#e1430a',
              label: '219 - 222',
            },
            {
              color: '#e04009',
              label: '222 - 225',
            },
            {
              color: '#dd3e08',
              label: '225 - 228',
            },
            {
              color: '#dc3c07',
              label: '228 - 231',
            },
            {
              color: '#da3907',
              label: '231 - 234',
            },
            {
              color: '#d73706',
              label: '234 - 237',
            },
            {
              color: '#d53506',
              label: '237 - 240',
            },
            {
              color: '#d33305',
              label: '240 - 243',
            },
            {
              color: '#d13005',
              label: '243 - 246',
            },
            {
              color: '#ce2e04',
              label: '246 - 249',
            },
            {
              color: '#cc2c04',
              label: '249 - 252',
            },
            {
              color: '#ca2a04',
              label: '252 - 255',
            },
            {
              color: '#c72803',
              label: '255 - 258',
            },
            {
              color: '#c42603',
              label: '258 - 261',
            },
            {
              color: '#c22403',
              label: '261 - 264',
            },
            {
              color: '#bf2202',
              label: '264 - 267',
            },
            {
              color: '#bc2002',
              label: '267 - 270',
            },
            {
              color: '#b91e02',
              label: '270 - 273',
            },
            {
              color: '#b61d02',
              label: '273 - 276',
            },
            {
              color: '#b31b01',
              label: '276 - 279',
            },
            {
              color: '#b01901',
              label: '279 - 282',
            },
            {
              color: '#ad1801',
              label: '282 - 285',
            },
            {
              color: '#aa1601',
              label: '285 - 288',
            },
            {
              color: '#a71401',
              label: '288 - 291',
            },
            {
              color: '#a41301',
              label: '291 - 294',
            },
            {
              color: '#a01201',
              label: '294 - 297',
            },
            {
              color: '#9d1001',
              label: '297 - 300',
            },
            {
              color: '#990f01',
              label: '300 - 303',
            },
            {
              color: '#960d01',
              label: '303 - 306',
            },
            {
              color: '#920c01',
              label: '306 - 309',
            },
            {
              color: '#8e0a01',
              label: '309 - 312',
            },
            {
              color: '#8a0902',
              label: '312 - 315',
            },
            {
              color: '#870802',
              label: '315 - 318',
            },
            {
              color: '#830702',
              label: '318 - 321',
            },
            {
              color: '#7c0503',
              label: '321 - 324',
            },
            {
              color: '#790403',
              label: '324 - 327',
            },
            {
              color: '#790403',
              label: '327 - 330',
            },
            {
              color: '#7a0403',
              label: '&gt; 330',
            },
          ],
          layer_id: 'l40',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'EU-climate monitor',
          monitor_id: 'm9',
          polygon_query_url: null,
          position: 'right',
          range: [
            '1961',
            '1962',
            '1963',
            '1964',
            '1965',
            '1966',
            '1967',
            '1968',
            '1969',
            '1970',
            '1971',
            '1972',
            '1973',
            '1974',
            '1975',
            '1976',
            '1977',
            '1978',
            '1979',
            '1980',
            '1981',
            '1982',
            '1983',
            '1984',
            '1985',
            '1986',
            '1987',
            '1988',
            '1989',
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
          ],
          range_labels: [
            '1961',
            '1962',
            '1963',
            '1964',
            '1965',
            '1966',
            '1967',
            '1968',
            '1969',
            '1970',
            '1971',
            '1972',
            '1973',
            '1974',
            '1975',
            '1976',
            '1977',
            '1978',
            '1979',
            '1980',
            '1981',
            '1982',
            '1983',
            '1984',
            '1985',
            '1986',
            '1987',
            '1988',
            '1989',
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
          ],
          regex: 'tmax_ann_.*_3035',
          scale: 0.1,
          srv_path: 'eu_agg_ann_temperature_max/',
          theme: 'Climate & Health',
          title: 'European annual averages of maximum temperature at 1 km resolution',
          unit: '°C x 10',
          usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
          use_case: 'Meteo-based agricultural insurance tool',
          value_society: 'Morbi eget lacus nulla.',
          geo_story_id: 'g23',
        },
        {
          author: null,
          coverage: 'European',
          data_meaning:
            'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
          description:
            'European annual average maps of minimum temperature at 1 km spatial resolution, for the period 1961-2020.',
          download_url: null,
          filename: 'tmin_ann_*_3035.tif',
          geo_story: 'Climate change (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:eu_agg_ann_temperature_min',
          gs_style: [
            {
              color: '#30123b',
              label: '&lt;= -183',
            },
            {
              color: '#1b0d27',
              label: '-183 - -180',
            },
            {
              color: '#281744',
              label: '-180 - -177',
            },
            {
              color: '#2e1f57',
              label: '-177 - -174',
            },
            {
              color: '#322667',
              label: '-174 - -171',
            },
            {
              color: '#362c76',
              label: '-171 - -168',
            },
            {
              color: '#393283',
              label: '-168 - -165',
            },
            {
              color: '#3b3990',
              label: '-165 - -162',
            },
            {
              color: '#3d3e9c',
              label: '-162 - -159',
            },
            {
              color: '#3e44a7',
              label: '-159 - -156',
            },
            {
              color: '#404ab1',
              label: '-156 - -153',
            },
            {
              color: '#4150ba',
              label: '-153 - -150',
            },
            {
              color: '#4256c3',
              label: '-150 - -147',
            },
            {
              color: '#435bcc',
              label: '-147 - -144',
            },
            {
              color: '#4461d3',
              label: '-144 - -141',
            },
            {
              color: '#4466da',
              label: '-141 - -138',
            },
            {
              color: '#456ce0',
              label: '-138 - -135',
            },
            {
              color: '#4571e6',
              label: '-135 - -132',
            },
            {
              color: '#4576eb',
              label: '-132 - -129',
            },
            {
              color: '#447cef',
              label: '-129 - -126',
            },
            {
              color: '#4481f3',
              label: '-126 - -123',
            },
            {
              color: '#4486f6',
              label: '-123 - -120',
            },
            {
              color: '#438cf8',
              label: '-120 - -117',
            },
            {
              color: '#4191f9',
              label: '-117 - -114',
            },
            {
              color: '#3e96fa',
              label: '-114 - -111',
            },
            {
              color: '#3b9bf9',
              label: '-111 - -108',
            },
            {
              color: '#38a1f7',
              label: '-108 - -105',
            },
            {
              color: '#35a6f5',
              label: '-105 - -102',
            },
            {
              color: '#31abf2',
              label: '-102 - -99',
            },
            {
              color: '#2eb0ef',
              label: '-99 - -96',
            },
            {
              color: '#2ab6eb',
              label: '-96 - -93',
            },
            {
              color: '#26bbe6',
              label: '-93 - -90',
            },
            {
              color: '#23bfe1',
              label: '-90 - -87',
            },
            {
              color: '#20c4dc',
              label: '-87 - -84',
            },
            {
              color: '#1dc8d7',
              label: '-84 - -81',
            },
            {
              color: '#1bcdd2',
              label: '-81 - -78',
            },
            {
              color: '#19d1cc',
              label: '-78 - -75',
            },
            {
              color: '#18d5c7',
              label: '-75 - -72',
            },
            {
              color: '#18d9c1',
              label: '-72 - -69',
            },
            {
              color: '#18dcbc',
              label: '-69 - -66',
            },
            {
              color: '#19e0b8',
              label: '-66 - -63',
            },
            {
              color: '#1be3b3',
              label: '-63 - -60',
            },
            {
              color: '#1ee6ae',
              label: '-60 - -57',
            },
            {
              color: '#21e8a8',
              label: '-57 - -54',
            },
            {
              color: '#27eba2',
              label: '-54 - -51',
            },
            {
              color: '#2ced9c',
              label: '-51 - -48',
            },
            {
              color: '#32f096',
              label: '-48 - -45',
            },
            {
              color: '#38f28f',
              label: '-45 - -42',
            },
            {
              color: '#40f488',
              label: '-42 - -39',
            },
            {
              color: '#47f581',
              label: '-39 - -36',
            },
            {
              color: '#4ff77a',
              label: '-36 - -33',
            },
            {
              color: '#56f873',
              label: '-33 - -30',
            },
            {
              color: '#5ffa6c',
              label: '-30 - -27',
            },
            {
              color: '#67fb66',
              label: '-27 - -24',
            },
            {
              color: '#6ffc5f',
              label: '-24 - -21',
            },
            {
              color: '#78fc58',
              label: '-21 - -18',
            },
            {
              color: '#7ffd52',
              label: '-18 - -15',
            },
            {
              color: '#87fd4d',
              label: '-15 - -12',
            },
            {
              color: '#8efd48',
              label: '-12 - -9',
            },
            {
              color: '#96fc43',
              label: '-9 - -6',
            },
            {
              color: '#9cfc3f',
              label: '-6 - -3',
            },
            {
              color: '#a1fb3c',
              label: '-3 - 0',
            },
            {
              color: '#a6fa39',
              label: '0 - 3',
            },
            {
              color: '#a8f938',
              label: '3 - 6',
            },
            {
              color: '#acf937',
              label: '6 - 9',
            },
            {
              color: '#aff836',
              label: '9 - 12',
            },
            {
              color: '#b2f636',
              label: '12 - 15',
            },
            {
              color: '#b5f535',
              label: '15 - 18',
            },
            {
              color: '#b8f435',
              label: '18 - 21',
            },
            {
              color: '#bbf334',
              label: '21 - 24',
            },
            {
              color: '#bef234',
              label: '24 - 27',
            },
            {
              color: '#c1f034',
              label: '27 - 30',
            },
            {
              color: '#c4ef34',
              label: '30 - 33',
            },
            {
              color: '#c6ed34',
              label: '33 - 36',
            },
            {
              color: '#caeb34',
              label: '36 - 39',
            },
            {
              color: '#ccea34',
              label: '39 - 42',
            },
            {
              color: '#cfe834',
              label: '42 - 45',
            },
            {
              color: '#d2e635',
              label: '45 - 48',
            },
            {
              color: '#d5e435',
              label: '48 - 51',
            },
            {
              color: '#d7e335',
              label: '51 - 54',
            },
            {
              color: '#dae036',
              label: '54 - 57',
            },
            {
              color: '#dcde37',
              label: '57 - 60',
            },
            {
              color: '#dedd37',
              label: '60 - 63',
            },
            {
              color: '#e1db37',
              label: '63 - 66',
            },
            {
              color: '#e3d838',
              label: '66 - 69',
            },
            {
              color: '#e5d638',
              label: '69 - 72',
            },
            {
              color: '#e7d439',
              label: '72 - 75',
            },
            {
              color: '#ead139',
              label: '75 - 78',
            },
            {
              color: '#ebcf3a',
              label: '78 - 81',
            },
            {
              color: '#edcd3a',
              label: '81 - 84',
            },
            {
              color: '#efca3a',
              label: '84 - 87',
            },
            {
              color: '#f0c83a',
              label: '87 - 90',
            },
            {
              color: '#f2c63a',
              label: '90 - 93',
            },
            {
              color: '#f4c43a',
              label: '93 - 96',
            },
            {
              color: '#f5c13a',
              label: '96 - 99',
            },
            {
              color: '#f6bf39',
              label: '99 - 102',
            },
            {
              color: '#f7bc39',
              label: '102 - 105',
            },
            {
              color: '#f8b939',
              label: '105 - 108',
            },
            {
              color: '#f9b738',
              label: '108 - 111',
            },
            {
              color: '#fab437',
              label: '111 - 114',
            },
            {
              color: '#fab136',
              label: '114 - 117',
            },
            {
              color: '#fbaf35',
              label: '117 - 120',
            },
            {
              color: '#fcac34',
              label: '120 - 123',
            },
            {
              color: '#fca933',
              label: '123 - 126',
            },
            {
              color: '#fda632',
              label: '126 - 129',
            },
            {
              color: '#fda331',
              label: '129 - 132',
            },
            {
              color: '#fd9f2f',
              label: '132 - 135',
            },
            {
              color: '#fd9c2e',
              label: '135 - 138',
            },
            {
              color: '#fd992c',
              label: '138 - 141',
            },
            {
              color: '#fd962b',
              label: '141 - 144',
            },
            {
              color: '#fd932a',
              label: '144 - 147',
            },
            {
              color: '#fc8f28',
              label: '147 - 150',
            },
            {
              color: '#fc8c27',
              label: '150 - 153',
            },
            {
              color: '#fb8825',
              label: '153 - 156',
            },
            {
              color: '#fb8524',
              label: '156 - 159',
            },
            {
              color: '#fa8122',
              label: '159 - 162',
            },
            {
              color: '#fa7e21',
              label: '162 - 165',
            },
            {
              color: '#f97a1f',
              label: '165 - 168',
            },
            {
              color: '#f8771e',
              label: '168 - 171',
            },
            {
              color: '#f7731c',
              label: '171 - 174',
            },
            {
              color: '#f6701b',
              label: '174 - 177',
            },
            {
              color: '#f56c19',
              label: '177 - 180',
            },
            {
              color: '#f46918',
              label: '180 - 183',
            },
            {
              color: '#f36517',
              label: '183 - 186',
            },
            {
              color: '#f26215',
              label: '186 - 189',
            },
            {
              color: '#f05f14',
              label: '189 - 192',
            },
            {
              color: '#ef5c12',
              label: '192 - 195',
            },
            {
              color: '#ee5911',
              label: '195 - 198',
            },
            {
              color: '#ec5510',
              label: '198 - 201',
            },
            {
              color: '#eb520f',
              label: '201 - 204',
            },
            {
              color: '#ea4f0e',
              label: '204 - 207',
            },
            {
              color: '#e84d0d',
              label: '207 - 210',
            },
            {
              color: '#e64a0c',
              label: '210 - 213',
            },
            {
              color: '#e5470b',
              label: '213 - 216',
            },
            {
              color: '#e3450a',
              label: '216 - 219',
            },
            {
              color: '#e1430a',
              label: '219 - 222',
            },
            {
              color: '#e04009',
              label: '222 - 225',
            },
            {
              color: '#dd3e08',
              label: '225 - 228',
            },
            {
              color: '#dc3c07',
              label: '228 - 231',
            },
            {
              color: '#da3907',
              label: '231 - 234',
            },
            {
              color: '#d73706',
              label: '234 - 237',
            },
            {
              color: '#d53506',
              label: '237 - 240',
            },
            {
              color: '#d33305',
              label: '240 - 243',
            },
            {
              color: '#d13005',
              label: '243 - 246',
            },
            {
              color: '#ce2e04',
              label: '246 - 249',
            },
            {
              color: '#cc2c04',
              label: '249 - 252',
            },
            {
              color: '#ca2a04',
              label: '252 - 255',
            },
            {
              color: '#c72803',
              label: '255 - 258',
            },
            {
              color: '#c42603',
              label: '258 - 261',
            },
            {
              color: '#c22403',
              label: '261 - 264',
            },
            {
              color: '#bf2202',
              label: '264 - 267',
            },
            {
              color: '#bc2002',
              label: '267 - 270',
            },
            {
              color: '#b91e02',
              label: '270 - 273',
            },
            {
              color: '#b61d02',
              label: '273 - 276',
            },
            {
              color: '#b31b01',
              label: '276 - 279',
            },
            {
              color: '#b01901',
              label: '279 - 282',
            },
            {
              color: '#ad1801',
              label: '282 - 285',
            },
            {
              color: '#aa1601',
              label: '285 - 288',
            },
            {
              color: '#a71401',
              label: '288 - 291',
            },
            {
              color: '#a41301',
              label: '291 - 294',
            },
            {
              color: '#a01201',
              label: '294 - 297',
            },
            {
              color: '#9d1001',
              label: '297 - 300',
            },
            {
              color: '#990f01',
              label: '300 - 303',
            },
            {
              color: '#960d01',
              label: '303 - 306',
            },
            {
              color: '#920c01',
              label: '306 - 309',
            },
            {
              color: '#8e0a01',
              label: '309 - 312',
            },
            {
              color: '#8a0902',
              label: '312 - 315',
            },
            {
              color: '#870802',
              label: '315 - 318',
            },
            {
              color: '#830702',
              label: '318 - 321',
            },
            {
              color: '#7c0503',
              label: '321 - 324',
            },
            {
              color: '#790403',
              label: '324 - 327',
            },
            {
              color: '#790403',
              label: '327 - 330',
            },
            {
              color: '#7a0403',
              label: '&gt; 330',
            },
          ],
          layer_id: 'l41',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'EU-climate monitor',
          monitor_id: 'm9',
          polygon_query_url: null,
          position: 'right',
          range: [
            '1961',
            '1962',
            '1963',
            '1964',
            '1965',
            '1966',
            '1967',
            '1968',
            '1969',
            '1970',
            '1971',
            '1972',
            '1973',
            '1974',
            '1975',
            '1976',
            '1977',
            '1978',
            '1979',
            '1980',
            '1981',
            '1982',
            '1983',
            '1984',
            '1985',
            '1986',
            '1987',
            '1988',
            '1989',
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
          ],
          range_labels: [
            '1961',
            '1962',
            '1963',
            '1964',
            '1965',
            '1966',
            '1967',
            '1968',
            '1969',
            '1970',
            '1971',
            '1972',
            '1973',
            '1974',
            '1975',
            '1976',
            '1977',
            '1978',
            '1979',
            '1980',
            '1981',
            '1982',
            '1983',
            '1984',
            '1985',
            '1986',
            '1987',
            '1988',
            '1989',
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
          ],
          regex: 'tmin_ann_.*_3035',
          scale: 0.1,
          srv_path: 'eu_agg_ann_temperature_min/',
          theme: 'Climate & Health',
          title: 'European annual averages of minimum temperature at 1 km resolution',
          unit: '°C x 10',
          usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
          use_case: 'Meteo-based agricultural insurance tool',
          value_society: 'Morbi eget lacus nulla.',
          geo_story_id: 'g23',
        },
        {
          author: null,
          coverage: 'European',
          data_meaning:
            'Nullam eu risus dapibus odio cursus iaculis eget vel lacus. Ut id eros ac velit tincidunt condimentum eget eu erat. Aliquam nec semper sem.',
          description:
            'European annual average maps of mean temperature at 1 km spatial resolution, for the period 1961-2020.',
          download_url: null,
          filename: 'tmean_ann_*_3035.tif',
          geo_story: 'Climate change (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:eu_agg_ann_temperature_mean',
          gs_style: [
            {
              color: '#30123b',
              label: '&lt;= -183',
            },
            {
              color: '#1b0d27',
              label: '-183 - -180',
            },
            {
              color: '#281744',
              label: '-180 - -177',
            },
            {
              color: '#2e1f57',
              label: '-177 - -174',
            },
            {
              color: '#322667',
              label: '-174 - -171',
            },
            {
              color: '#362c76',
              label: '-171 - -168',
            },
            {
              color: '#393283',
              label: '-168 - -165',
            },
            {
              color: '#3b3990',
              label: '-165 - -162',
            },
            {
              color: '#3d3e9c',
              label: '-162 - -159',
            },
            {
              color: '#3e44a7',
              label: '-159 - -156',
            },
            {
              color: '#404ab1',
              label: '-156 - -153',
            },
            {
              color: '#4150ba',
              label: '-153 - -150',
            },
            {
              color: '#4256c3',
              label: '-150 - -147',
            },
            {
              color: '#435bcc',
              label: '-147 - -144',
            },
            {
              color: '#4461d3',
              label: '-144 - -141',
            },
            {
              color: '#4466da',
              label: '-141 - -138',
            },
            {
              color: '#456ce0',
              label: '-138 - -135',
            },
            {
              color: '#4571e6',
              label: '-135 - -132',
            },
            {
              color: '#4576eb',
              label: '-132 - -129',
            },
            {
              color: '#447cef',
              label: '-129 - -126',
            },
            {
              color: '#4481f3',
              label: '-126 - -123',
            },
            {
              color: '#4486f6',
              label: '-123 - -120',
            },
            {
              color: '#438cf8',
              label: '-120 - -117',
            },
            {
              color: '#4191f9',
              label: '-117 - -114',
            },
            {
              color: '#3e96fa',
              label: '-114 - -111',
            },
            {
              color: '#3b9bf9',
              label: '-111 - -108',
            },
            {
              color: '#38a1f7',
              label: '-108 - -105',
            },
            {
              color: '#35a6f5',
              label: '-105 - -102',
            },
            {
              color: '#31abf2',
              label: '-102 - -99',
            },
            {
              color: '#2eb0ef',
              label: '-99 - -96',
            },
            {
              color: '#2ab6eb',
              label: '-96 - -93',
            },
            {
              color: '#26bbe6',
              label: '-93 - -90',
            },
            {
              color: '#23bfe1',
              label: '-90 - -87',
            },
            {
              color: '#20c4dc',
              label: '-87 - -84',
            },
            {
              color: '#1dc8d7',
              label: '-84 - -81',
            },
            {
              color: '#1bcdd2',
              label: '-81 - -78',
            },
            {
              color: '#19d1cc',
              label: '-78 - -75',
            },
            {
              color: '#18d5c7',
              label: '-75 - -72',
            },
            {
              color: '#18d9c1',
              label: '-72 - -69',
            },
            {
              color: '#18dcbc',
              label: '-69 - -66',
            },
            {
              color: '#19e0b8',
              label: '-66 - -63',
            },
            {
              color: '#1be3b3',
              label: '-63 - -60',
            },
            {
              color: '#1ee6ae',
              label: '-60 - -57',
            },
            {
              color: '#21e8a8',
              label: '-57 - -54',
            },
            {
              color: '#27eba2',
              label: '-54 - -51',
            },
            {
              color: '#2ced9c',
              label: '-51 - -48',
            },
            {
              color: '#32f096',
              label: '-48 - -45',
            },
            {
              color: '#38f28f',
              label: '-45 - -42',
            },
            {
              color: '#40f488',
              label: '-42 - -39',
            },
            {
              color: '#47f581',
              label: '-39 - -36',
            },
            {
              color: '#4ff77a',
              label: '-36 - -33',
            },
            {
              color: '#56f873',
              label: '-33 - -30',
            },
            {
              color: '#5ffa6c',
              label: '-30 - -27',
            },
            {
              color: '#67fb66',
              label: '-27 - -24',
            },
            {
              color: '#6ffc5f',
              label: '-24 - -21',
            },
            {
              color: '#78fc58',
              label: '-21 - -18',
            },
            {
              color: '#7ffd52',
              label: '-18 - -15',
            },
            {
              color: '#87fd4d',
              label: '-15 - -12',
            },
            {
              color: '#8efd48',
              label: '-12 - -9',
            },
            {
              color: '#96fc43',
              label: '-9 - -6',
            },
            {
              color: '#9cfc3f',
              label: '-6 - -3',
            },
            {
              color: '#a1fb3c',
              label: '-3 - 0',
            },
            {
              color: '#a6fa39',
              label: '0 - 3',
            },
            {
              color: '#a8f938',
              label: '3 - 6',
            },
            {
              color: '#acf937',
              label: '6 - 9',
            },
            {
              color: '#aff836',
              label: '9 - 12',
            },
            {
              color: '#b2f636',
              label: '12 - 15',
            },
            {
              color: '#b5f535',
              label: '15 - 18',
            },
            {
              color: '#b8f435',
              label: '18 - 21',
            },
            {
              color: '#bbf334',
              label: '21 - 24',
            },
            {
              color: '#bef234',
              label: '24 - 27',
            },
            {
              color: '#c1f034',
              label: '27 - 30',
            },
            {
              color: '#c4ef34',
              label: '30 - 33',
            },
            {
              color: '#c6ed34',
              label: '33 - 36',
            },
            {
              color: '#caeb34',
              label: '36 - 39',
            },
            {
              color: '#ccea34',
              label: '39 - 42',
            },
            {
              color: '#cfe834',
              label: '42 - 45',
            },
            {
              color: '#d2e635',
              label: '45 - 48',
            },
            {
              color: '#d5e435',
              label: '48 - 51',
            },
            {
              color: '#d7e335',
              label: '51 - 54',
            },
            {
              color: '#dae036',
              label: '54 - 57',
            },
            {
              color: '#dcde37',
              label: '57 - 60',
            },
            {
              color: '#dedd37',
              label: '60 - 63',
            },
            {
              color: '#e1db37',
              label: '63 - 66',
            },
            {
              color: '#e3d838',
              label: '66 - 69',
            },
            {
              color: '#e5d638',
              label: '69 - 72',
            },
            {
              color: '#e7d439',
              label: '72 - 75',
            },
            {
              color: '#ead139',
              label: '75 - 78',
            },
            {
              color: '#ebcf3a',
              label: '78 - 81',
            },
            {
              color: '#edcd3a',
              label: '81 - 84',
            },
            {
              color: '#efca3a',
              label: '84 - 87',
            },
            {
              color: '#f0c83a',
              label: '87 - 90',
            },
            {
              color: '#f2c63a',
              label: '90 - 93',
            },
            {
              color: '#f4c43a',
              label: '93 - 96',
            },
            {
              color: '#f5c13a',
              label: '96 - 99',
            },
            {
              color: '#f6bf39',
              label: '99 - 102',
            },
            {
              color: '#f7bc39',
              label: '102 - 105',
            },
            {
              color: '#f8b939',
              label: '105 - 108',
            },
            {
              color: '#f9b738',
              label: '108 - 111',
            },
            {
              color: '#fab437',
              label: '111 - 114',
            },
            {
              color: '#fab136',
              label: '114 - 117',
            },
            {
              color: '#fbaf35',
              label: '117 - 120',
            },
            {
              color: '#fcac34',
              label: '120 - 123',
            },
            {
              color: '#fca933',
              label: '123 - 126',
            },
            {
              color: '#fda632',
              label: '126 - 129',
            },
            {
              color: '#fda331',
              label: '129 - 132',
            },
            {
              color: '#fd9f2f',
              label: '132 - 135',
            },
            {
              color: '#fd9c2e',
              label: '135 - 138',
            },
            {
              color: '#fd992c',
              label: '138 - 141',
            },
            {
              color: '#fd962b',
              label: '141 - 144',
            },
            {
              color: '#fd932a',
              label: '144 - 147',
            },
            {
              color: '#fc8f28',
              label: '147 - 150',
            },
            {
              color: '#fc8c27',
              label: '150 - 153',
            },
            {
              color: '#fb8825',
              label: '153 - 156',
            },
            {
              color: '#fb8524',
              label: '156 - 159',
            },
            {
              color: '#fa8122',
              label: '159 - 162',
            },
            {
              color: '#fa7e21',
              label: '162 - 165',
            },
            {
              color: '#f97a1f',
              label: '165 - 168',
            },
            {
              color: '#f8771e',
              label: '168 - 171',
            },
            {
              color: '#f7731c',
              label: '171 - 174',
            },
            {
              color: '#f6701b',
              label: '174 - 177',
            },
            {
              color: '#f56c19',
              label: '177 - 180',
            },
            {
              color: '#f46918',
              label: '180 - 183',
            },
            {
              color: '#f36517',
              label: '183 - 186',
            },
            {
              color: '#f26215',
              label: '186 - 189',
            },
            {
              color: '#f05f14',
              label: '189 - 192',
            },
            {
              color: '#ef5c12',
              label: '192 - 195',
            },
            {
              color: '#ee5911',
              label: '195 - 198',
            },
            {
              color: '#ec5510',
              label: '198 - 201',
            },
            {
              color: '#eb520f',
              label: '201 - 204',
            },
            {
              color: '#ea4f0e',
              label: '204 - 207',
            },
            {
              color: '#e84d0d',
              label: '207 - 210',
            },
            {
              color: '#e64a0c',
              label: '210 - 213',
            },
            {
              color: '#e5470b',
              label: '213 - 216',
            },
            {
              color: '#e3450a',
              label: '216 - 219',
            },
            {
              color: '#e1430a',
              label: '219 - 222',
            },
            {
              color: '#e04009',
              label: '222 - 225',
            },
            {
              color: '#dd3e08',
              label: '225 - 228',
            },
            {
              color: '#dc3c07',
              label: '228 - 231',
            },
            {
              color: '#da3907',
              label: '231 - 234',
            },
            {
              color: '#d73706',
              label: '234 - 237',
            },
            {
              color: '#d53506',
              label: '237 - 240',
            },
            {
              color: '#d33305',
              label: '240 - 243',
            },
            {
              color: '#d13005',
              label: '243 - 246',
            },
            {
              color: '#ce2e04',
              label: '246 - 249',
            },
            {
              color: '#cc2c04',
              label: '249 - 252',
            },
            {
              color: '#ca2a04',
              label: '252 - 255',
            },
            {
              color: '#c72803',
              label: '255 - 258',
            },
            {
              color: '#c42603',
              label: '258 - 261',
            },
            {
              color: '#c22403',
              label: '261 - 264',
            },
            {
              color: '#bf2202',
              label: '264 - 267',
            },
            {
              color: '#bc2002',
              label: '267 - 270',
            },
            {
              color: '#b91e02',
              label: '270 - 273',
            },
            {
              color: '#b61d02',
              label: '273 - 276',
            },
            {
              color: '#b31b01',
              label: '276 - 279',
            },
            {
              color: '#b01901',
              label: '279 - 282',
            },
            {
              color: '#ad1801',
              label: '282 - 285',
            },
            {
              color: '#aa1601',
              label: '285 - 288',
            },
            {
              color: '#a71401',
              label: '288 - 291',
            },
            {
              color: '#a41301',
              label: '291 - 294',
            },
            {
              color: '#a01201',
              label: '294 - 297',
            },
            {
              color: '#9d1001',
              label: '297 - 300',
            },
            {
              color: '#990f01',
              label: '300 - 303',
            },
            {
              color: '#960d01',
              label: '303 - 306',
            },
            {
              color: '#920c01',
              label: '306 - 309',
            },
            {
              color: '#8e0a01',
              label: '309 - 312',
            },
            {
              color: '#8a0902',
              label: '312 - 315',
            },
            {
              color: '#870802',
              label: '315 - 318',
            },
            {
              color: '#830702',
              label: '318 - 321',
            },
            {
              color: '#7c0503',
              label: '321 - 324',
            },
            {
              color: '#790403',
              label: '324 - 327',
            },
            {
              color: '#790403',
              label: '327 - 330',
            },
            {
              color: '#7a0403',
              label: '&gt; 330',
            },
          ],
          layer_id: 'l42',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'EU-climate monitor',
          monitor_id: 'm9',
          polygon_query_url: null,
          position: 'right',
          range: [
            '1961',
            '1962',
            '1963',
            '1964',
            '1965',
            '1966',
            '1967',
            '1968',
            '1969',
            '1970',
            '1971',
            '1972',
            '1973',
            '1974',
            '1975',
            '1976',
            '1977',
            '1978',
            '1979',
            '1980',
            '1981',
            '1982',
            '1983',
            '1984',
            '1985',
            '1986',
            '1987',
            '1988',
            '1989',
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
          ],
          range_labels: [
            '1961',
            '1962',
            '1963',
            '1964',
            '1965',
            '1966',
            '1967',
            '1968',
            '1969',
            '1970',
            '1971',
            '1972',
            '1973',
            '1974',
            '1975',
            '1976',
            '1977',
            '1978',
            '1979',
            '1980',
            '1981',
            '1982',
            '1983',
            '1984',
            '1985',
            '1986',
            '1987',
            '1988',
            '1989',
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2020',
          ],
          regex: 'tmean_ann_.*_3035',
          scale: 0.1,
          srv_path: 'eu_agg_ann_temperature_mean',
          theme: 'Climate & Health',
          title: 'European annual averages of mean temperature at 1 km resolution',
          unit: '°C x 10',
          usage_examples: 'Fusce eget quam et quam tincidunt faucibus.',
          use_case: 'Meteo-based agricultural insurance tool',
          value_society: 'Duis quis quam ut nulla viverra elementum et ut mi.',
          geo_story_id: 'g23',
        },
      ],
      metadata_url: null,
      monitors: [
        {
          id: 'm9',
          title: 'EU-climate monitor',
        },
        {
          id: 'm19',
          title: 'Global ML-based gridded meteo dataset',
        },
      ],
      notebooks_url: null,
      publications: [
        {
          title: null,
          url: null,
        },
      ],
      ready: true,
      theme: 'Climate & Health',
      title: 'Climate change (Europe)',
      use_case_link: [
        {
          title: null,
          url: 'https:dailymeteo.com',
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
      ],
      entity_type: 'geo_story',
    },
    {
      author: 'Luca Brocca (luca.brocca@irpi.cnr.it)',
      date_created: '2023-12-01',
      description:
        'Increasing droughts require distributed data to characterize impacts in a systematic way. Soil mositure content anomalies are a key variable for it but only satelite data can provide enough resolution and coverage to monitor the migrating expansion or lessening of drought conditions across the continent.',
      geostory_bbox: [-3111292.7993, 2445984.9051, 5987771.0477, 12014677.854],
      geostory_center: null,
      geostory_zoom: null,
      id: 'g5',
      layers: [
        {
          author: 'CNR-IRPI',
          coverage: 'global (prototype Europe)',
          data_meaning: null,
          description:
            'Soil moisture anomaly (in std from monthly avg) at 12,5 km resolution in Europe at monthly scale',
          download_url: null,
          filename: 'ssma_hsaf.ascat_m_1km_s5cm_.*_.*_eu_epsg.4326_v20240310.tif',
          geo_story: 'Drought at high resolution in Europe (Europe)',
          gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
          gs_dimension: 'DIM_DATE',
          gs_name: 'oem:soil_moisture_12_5_eu',
          gs_style: [
            {
              label: '-3',
              color: '#90173d',
            },
            {
              label: '-2.5',
              color: '#b6352e',
            },
            {
              label: '-2',
              color: '#f1854e',
            },
            {
              label: '-1.5',
              color: '#f1ad4e',
            },
            {
              label: '-1',
              color: '#fee88e',
            },
            {
              label: '-0.5',
              color: '#fff7d2',
            },
            {
              label: '0.00',
              color: '#fefdff',
            },
            {
              label: '0.5',
              color: '#dceeff',
            },
            {
              label: '1',
              color: '#99d4ef',
            },
            {
              label: '1.5',
              color: '#108bdd',
            },
            {
              label: '2',
              color: '#2d6ae3',
            },
            {
              label: '2.5',
              color: '#1d3dbc',
            },
            {
              label: '3',
              color: '#110e5d',
            },
          ],
          layer_id: 'l25',
          license: null,
          location_query_url: null,
          metadata_url: null,
          monitor: 'World-Drought Monitor',
          monitor_id: 'm13',
          polygon_query_url: null,
          position: 'right',
          range: [
            '20170101_20170131',
            '20170201_20170228',
            '20170301_20170331',
            '20170401_20170430',
            '20170501_20170531',
            '20170601_20170630',
            '20170701_20170731',
            '20170801_20170831',
            '20170901_20170930',
            '20171001_20171031',
            '20171101_20171130',
            '20171201_20171231',
            '20180101_20180131',
            '20180201_20180228',
            '20180301_20180331',
            '20180401_20180430',
            '20180501_20180531',
            '20180601_20180630',
            '20180701_20180731',
            '20180801_20180831',
            '20180901_20180930',
            '20181001_20181031',
            '20181101_20181130',
            '20181201_20181231',
          ],
          range_labels: [
            'Jan 2017',
            'Feb 2017',
            'Mar 2017',
            'Apr 2017',
            'May 2017',
            'Jun 2017',
            'Jul 2017',
            'Aug 2017',
            'Sep 2017',
            'Oct 2017',
            'Nov 2017',
            'Dec 2017',
            'Jan 2018',
            'Feb 2018',
            'Mar 2018',
            'Apr 2018',
            'May 2018',
            'Jun 2018',
            'Jul 2018',
            'Aug 2018',
            'Sep 2018',
            'Oct 2018',
            'Nov 2018',
            'Dec 2018',
          ],
          regex: 'ssma_hsaf.ascat_m_1km_s5cm_.*_.*_eu_epsg.4326_v20240310',
          scale: null,
          srv_path: 'soil_moisture_12_5_eu/',
          theme: 'Water',
          title: 'Soil moisture index 12,5km resolution HSAF ASCAT h121 over Europe',
          unit: null,
          usage_examples: null,
          use_case: 'Global drought monitoring at high resolution',
          value_society: null,
          geo_story_id: 'g5',
        },
      ],
      metadata_url: null,
      monitors: [
        {
          id: 'm13',
          title: 'EU-drought monitor',
        },
        {
          id: 'm16',
          title: 'World-Drought Monitor',
        },
      ],
      notebooks_url: null,
      publications: [
        {
          title: null,
          url: null,
        },
      ],
      ready: true,
      theme: 'Climate & Health',
      title: 'Drought at high resolution in Europe (Europe)',
      use_case_link: [
        {
          title: 'Global drought monitoring at high resolution',
          url: null,
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
      ],
      entity_type: 'geo_story',
    },
    {
      app_release: 'pre-beta',
      author: null,
      coverage: 'european',
      date_created: '2024-01-01',
      description:
        'The OEMC Air Quality Monitor provides tools to retrieve, pre-process and interpolate measurement data and covariates at different temporal and spatial resolutions. The displayed maps are prototypes and will be updated later in the project. Similar products for PM2.5, NO2, and O3 will be added.',
      geostories: [
        {
          author: 'Johannes Heisig (jheisig@uni-muenster.de)',
          date_created: '2024-01-01',
          description:
            'Air pollution is a health risk to millions of people in Europe. An indicator for air quality is the concentration of particles with a size of ~10  m (PM10). Heavier pollution occurs in densely populated or industrial areas where we can observe more combustion of fossil fuels. The COVID-19 pandemic made many citizens remain at home when Europe went into lockdown. This sudden decline in demand for transport and industrial production had a positive impact on air quality in many regions. Check out the time series animation of monthly PM10 maps to get insights into air pollution in Europe throughout the years 2019 and 2020. Use the layer compare tool to inspect the differences between single time steps, for example April 2019 vs April 2020.',
          geostory_bbox: null,
          geostory_center: null,
          geostory_zoom: null,
          id: 'g31',
          layers: [
            {
              author: 'ifgi',
              coverage: 'european',
              data_meaning: null,
              description:
                'Interpolated maps of monthly particulate matter 10 measurement data for Europe before and during the onset of the COVID-19 pandemic',
              download_url: 'not intended to be published yet (prototype)',
              filename: 'air_quality.pm10_p90.41_1km_s_.*_eu_epsg.3035_v20240225.tiff',
              geo_story: "COVID-19's Effect on Europe's Air Quality (PM10)",
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:air_quality_pm10',
              gs_style: [
                {
                  label: '0 - 20',
                  color: '#168130',
                },
                {
                  label: '20 - 30',
                  color: '#7db72b',
                },
                {
                  label: '30 - 40',
                  color: '#fdd91d',
                },
                {
                  label: '40 - 50',
                  color: '#f39a0b',
                },
                {
                  label: '50 - 75',
                  color: '#ed6c34',
                },
                {
                  label: '> 75',
                  color: '#8f0f15',
                },
              ],
              layer_id: 'l17',
              license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
              location_query_url: null,
              metadata_url: null,
              monitor: 'Air Quality Monitor',
              monitor_id: 'm11',
              polygon_query_url: null,
              position: 'right',
              range: [
                '20190101_20190131',
                '20190201_20190228',
                '20190301_20190331',
                '20190401_20190430',
                '20190501_20190531',
                '20190601_20190630',
                '20190701_20190731',
                '20190801_20190831',
                '20190901_20190930',
                '20191001_20191031',
                '20191101_20191130',
                '20191201_20191231',
                '20200101_20200131',
                '20200201_20200229',
                '20200301_20200331',
                '20200401_20200430',
                '20200501_20200531',
                '20200601_20200630',
                '20200701_20200731',
                '20200801_20200831',
                '20200901_20200930',
                '20201001_20201031',
                '20201101_20201130',
                '20201201_20201231',
              ],
              range_labels: [
                'Jan 2019',
                'Feb 2019',
                'Mar 2019',
                'Apr 2019',
                'May 2019',
                'Jun 2019',
                'Jul 2019',
                'Aug 2019',
                'Sep 2019',
                'Oct 2019',
                'Nov 2019',
                'Dec 2019',
                'Jan 2020',
                'Feb 2020',
                'Mar 2020',
                'Apr 2020',
                'May 2020',
                'Jun 2020',
                'Jul 2020',
                'Aug 2020',
                'Sep 2020',
                'Oct 2020',
                'Nov 2020',
                'Dec 2020',
              ],
              regex: 'air_quality.pm10_p90.41_1km_s_.*_eu_epsg.3035_v20240225.tiff',
              scale: null,
              srv_path: 'air_quality_pm10/',
              theme: 'Climate & Health',
              title: 'Monthly PM10 Air Quality (2019-2020)',
              unit: 'µg/m³',
              usage_examples: null,
              use_case: 'Air quality assessment at continental scale',
              value_society: null,
              geo_story_id: 'g31',
            },
          ],
          metadata_url: null,
          monitors: [
            {
              id: 'm11',
              title: 'EU-air quality monitor',
            },
          ],
          notebooks_url: null,
          publications: [
            {
              title: null,
              url: null,
            },
          ],
          ready: true,
          theme: 'Climate & Health',
          title: 'Air Quality during COVID-19 (Europe)',
          use_case_link: [
            {
              title: null,
              url: 'https://earthmonitor.org/use-cases/',
              doi: ['https://doi.org/10.1000/demo_DOI'],
            },
          ],
        },
      ],
      id: 'm11',
      metadata_url: null,
      monitor_bbox: null,
      notebooks_url: null,
      publications: [
        {
          title: null,
          url: null,
        },
      ],
      ready: true,
      responsible_partner_name: 'IFGI - Institut für Geoinformatik Universität Münster',
      responsible_partner_url: 'http://stml.uni-muenster.de/',
      theme: 'Climate & Health',
      title: 'EU-air quality monitor',
      use_case_link: [
        {
          title: 'Air quality assessment at continental scale',
          url: 'https://earthmonitor.org/use-cases/',
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
        {
          title: 'Air quality assessment at regional scale',
          url: 'https://earthmonitor.org/use-cases/',
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
      ],
      entity_type: 'monitor',
    },
    {
      app_release: null,
      author: null,
      coverage: 'european',
      date_created: null,
      description:
        'The EU biodiversity monitor will produce annual estimates of biodiversity at high spatial resolution and make use of spectral characteristics of satellite images to describe landscape or ecosystem heterogeneity as approximations for biodiversity.',
      geostories: [
        {
          author: 'Felix Specker (felix.specker@usys.ethz.ch)',
          date_created: '2024-01-01',
          description:
            "Annual maps of different functional trait diversity metrics created using Sentinel-2 data and radiative transfer model inversion. 'Disclaimer: This geostory does not yet contain data.'",
          geostory_bbox: null,
          geostory_center: null,
          geostory_zoom: null,
          id: 'g18',
          layers: null,
          metadata_url: null,
          monitors: [
            {
              id: 'm2',
              title: 'World-reforestation monitor',
            },
            {
              id: 'm7',
              title: 'EU-biodiversity monitor',
            },
          ],
          notebooks_url: null,
          publications: [
            {
              title: null,
              url: null,
            },
          ],
          ready: false,
          theme: 'Biodiversity',
          title: 'Vegetation trait diversity',
          use_case_link: [
            {
              title: null,
              url: 'https://restor.eco/sites/bd857f5f-8ade-4c0c-bc90-8caeff7b4cf7/?lat=56.23103019707008&lng=-4.591889874999988&zoom=9.59634536897742',
              doi: ['https://doi.org/10.1000/demo_DOI'],
            },
          ],
        },
        {
          author: 'Felix Specker (felix.specker@usys.ethz.ch)',
          date_created: '2024-02-01',
          description:
            "Annual maps of functional traits (~20m resolution), including leaf chlorophyll content, leaf area index, equivalent water content (i.e. leaf water content) and leaf mass per area (e.g. leaf dry matter content). The maps are derived from Sentinel-2 data by performing radiative transfer model inversion. We plan to display specific reforestation/disturbance events and show the time series evolution of the trait values for these plots at a later stage. 'Disclaimer: The displayed maps are not yet the final products. This is a static EU-wide prototype for the year 2020, which will be extended to global and yearly coverage later'.",
          geostory_bbox: null,
          geostory_center: [-813598.7217030791, 7712662.294252882],
          geostory_zoom: [3.8],
          id: 'g25',
          layers: [
            {
              author: 'ETH Zurich',
              coverage: 'global',
              data_meaning: null,
              description:
                'Global FAPAR (fraction of absorbed photosynthetically active radiation) during peak growing season at 100m resolution',
              download_url: 'to be published',
              filename: 'fapar_rtm.mlp_mean_100m_s_.*_go_epsg.4326_v10.tif',
              geo_story:
                'High resolution leaf and canopy trait maps for monitoring reforestion efforts globally',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:chl_rtm_ann',
              gs_style: [
                {
                  color: '#ffffdd',
                  label: '0.00',
                },
                {
                  color: '#e6ad12',
                  label: '0.25',
                },
                {
                  color: '#c53859',
                  label: '0.50',
                },
                {
                  color: '#3a26a1',
                  label: '0.75',
                },
                {
                  color: '#000000',
                  label: '1.00',
                },
              ],
              layer_id: 'l11',
              license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
              location_query_url: null,
              metadata_url: 'to be published',
              monitor: 'World reforestation monitor',
              monitor_id: 'm2',
              polygon_query_url: null,
              position: 'right',
              range: [
                '20190101_20191231',
                '20200101_20201231',
                '20210101_20211231',
                '20220101_20221231',
                '20230101_20231231',
              ],
              range_labels: ['2019', '2020', '2021', '2022', '2023'],
              regex: 'fapar_rtm.mlp_mean_100m_s_.*_go_epsg.4326_v10.tif',
              scale: 0.0001,
              srv_path: 'chl_rtm_ann',
              theme: 'Forest',
              title: 'FAPAR yearly (2019 - 2023)',
              unit: null,
              usage_examples: null,
              use_case:
                'World-reforestation monitor use case community conservation Campeche, Mexico',
              value_society: null,
              geo_story_id: 'g25',
            },
            {
              author: 'ETH Zurich',
              coverage: 'global',
              data_meaning: null,
              description:
                'Global LAI (leaf area index) during peak growing season at 100m resolution',
              download_url: 'to be published',
              filename: 'lai_rtm.mlp_mean_100m_s_.*_go_epsg.4326_v10.tif',
              geo_story:
                'High resolution leaf and canopy trait maps for monitoring reforestion efforts globally',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:lai_rtm_ann',
              gs_style: [
                {
                  color: '#fffdcd',
                  label: '0.00',
                },
                {
                  color: '#e5d37e',
                  label: '1.00',
                },
                {
                  color: '#b7b434',
                  label: '2.00',
                },
                {
                  color: '#408418',
                  label: '3.00',
                },
                {
                  color: '#154426',
                  label: '4.00',
                },
                {
                  color: '#172313',
                  label: '5.00',
                },
              ],
              layer_id: 'l12',
              license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
              location_query_url: null,
              metadata_url: 'to be published',
              monitor: 'World reforestation monitor',
              monitor_id: 'm2',
              polygon_query_url: null,
              position: 'right',
              range: [
                '20190101_20191231',
                '20200101_20201231',
                '20210101_20211231',
                '20220101_20221231',
                '20230101_20231231',
              ],
              range_labels: ['2019', '2020', '2021', '2022', '2023'],
              regex: 'lai_rtm.mlp_mean_100m_s_.*_go_epsg.4326_v10.tif',
              scale: 0.001,
              srv_path: 'lai_rtm_ann',
              theme: 'Forest',
              title: 'LAI yearly (2019 - 2023)',
              unit: 'm²/m²',
              usage_examples: null,
              use_case:
                'World-reforestation monitor use case community conservation Campeche, Mexico',
              value_society: null,
              geo_story_id: 'g25',
            },
            {
              author: 'ETH Zurich',
              coverage: 'global',
              data_meaning: null,
              description:
                'Global FCOVER (fractional vegetation cover) during peak growing season at 100m resolution',
              download_url: 'to be published',
              filename: 'fcover_rtm.mlp_mean_100m_s_.*_go_epsg.4326_v10.tif',
              geo_story:
                'High resolution leaf and canopy trait maps for monitoring reforestion efforts globally',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:ewt_rtm_ann',
              gs_style: [
                {
                  color: '#f7fcf5',
                  label: '0.00',
                },
                {
                  color: '#c7e9c0',
                  label: '0.25',
                },
                {
                  color: '#74c476',
                  label: '0.50',
                },
                {
                  color: '#238b45',
                  label: '0.75',
                },
                {
                  color: '#00441b',
                  label: '1.00',
                },
              ],
              layer_id: 'l13',
              license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
              location_query_url: null,
              metadata_url: 'to be published',
              monitor: 'World reforestation monitor',
              monitor_id: 'm2',
              polygon_query_url: null,
              position: 'right',
              range: [
                '20190101_20191231',
                '20200101_20201231',
                '20210101_20211231',
                '20220101_20221231',
                '20230101_20231231',
              ],
              range_labels: ['2019', '2020', '2021', '2022', '2023'],
              regex: 'fcover_rtm.mlp_mean_100m_s_.*_go_epsg.4326_v10.tif',
              scale: 0.0001,
              srv_path: 'ewt_rtm_ann',
              theme: 'Forest',
              title: 'FCOVER yearly (2019 - 2023)',
              unit: null,
              usage_examples: null,
              use_case:
                'World-reforestation monitor use case community conservation Campeche, Mexico',
              value_society: null,
              geo_story_id: 'g25',
            },
          ],
          metadata_url: null,
          monitors: [
            {
              id: 'm2',
              title: 'World-reforestation monitor',
            },
            {
              id: 'm7',
              title: 'EU-biodiversity monitor',
            },
          ],
          notebooks_url: null,
          publications: [
            {
              title: null,
              url: null,
            },
          ],
          ready: true,
          theme: 'Forest',
          title: 'Trait-based reforestation monitoring',
          use_case_link: [
            {
              title: null,
              url: 'https://restor.eco',
              doi: ['https://doi.org/10.1000/demo_DOI'],
            },
          ],
        },
      ],
      id: 'm7',
      metadata_url: null,
      monitor_bbox: null,
      notebooks_url: null,
      publications: [
        {
          title: null,
          url: null,
        },
      ],
      ready: true,
      responsible_partner_name: 'ETH - Eidgenössische Technische Hochschule Zürich',
      responsible_partner_url: 'https://usys.ethz.ch',
      theme: 'Biodiversity',
      title: 'EU-biodiversity monitor',
      use_case_link: [
        {
          title: 'Biodiversity monitoring and reporting tools for IDH',
          url: null,
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
      ],
      entity_type: 'monitor',
    },
    {
      app_release: null,
      author: null,
      coverage: 'european',
      date_created: null,
      description:
        'The EU climate monitor will investigate impact assessment and financial analysis at high spatial resolution to support EU climate adaptation Strategy and also analyse the vulnerability to climate extremes.',
      geostories: [
        {
          author: 'Aleksandar Sekuli? (asekulic@gilab.rs), Milan Kilibarda (mkilibarda@gilab.rs)',
          date_created: null,
          description:
            'Change in max., min., mean temperature, sea-level pressure, and total precipitation across Europe can be analysed at 2 levels:\n1) Annual annual summaries maps are used to detect the changes between two periods\n2) Changes from year to year can be analysed from annual summaries.',
          geostory_bbox: null,
          geostory_center: null,
          geostory_zoom: null,
          id: 'g23',
          layers: [
            {
              author: null,
              coverage: 'European',
              data_meaning:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur, libero vitae pellentesque sodales, urna nibh lobortis nisi, eu ultricies est dolor et tortor.',
              description:
                'European annual long-term means (LTM) maps of maximum temperature at 1 km spatial resolution, for periods 1961-1990 and 1991-2020.',
              download_url: null,
              filename: 'tmax_ltm_ann_*_3035.tif',
              geo_story: 'Climate change (Europe)',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:eu_ltm_temperature_max',
              gs_style: [
                {
                  color: '#30123b',
                  label: '&lt;= -183',
                },
                {
                  color: '#1b0d27',
                  label: '-183 - -180',
                },
                {
                  color: '#281744',
                  label: '-180 - -177',
                },
                {
                  color: '#2e1f57',
                  label: '-177 - -174',
                },
                {
                  color: '#322667',
                  label: '-174 - -171',
                },
                {
                  color: '#362c76',
                  label: '-171 - -168',
                },
                {
                  color: '#393283',
                  label: '-168 - -165',
                },
                {
                  color: '#3b3990',
                  label: '-165 - -162',
                },
                {
                  color: '#3d3e9c',
                  label: '-162 - -159',
                },
                {
                  color: '#3e44a7',
                  label: '-159 - -156',
                },
                {
                  color: '#404ab1',
                  label: '-156 - -153',
                },
                {
                  color: '#4150ba',
                  label: '-153 - -150',
                },
                {
                  color: '#4256c3',
                  label: '-150 - -147',
                },
                {
                  color: '#435bcc',
                  label: '-147 - -144',
                },
                {
                  color: '#4461d3',
                  label: '-144 - -141',
                },
                {
                  color: '#4466da',
                  label: '-141 - -138',
                },
                {
                  color: '#456ce0',
                  label: '-138 - -135',
                },
                {
                  color: '#4571e6',
                  label: '-135 - -132',
                },
                {
                  color: '#4576eb',
                  label: '-132 - -129',
                },
                {
                  color: '#447cef',
                  label: '-129 - -126',
                },
                {
                  color: '#4481f3',
                  label: '-126 - -123',
                },
                {
                  color: '#4486f6',
                  label: '-123 - -120',
                },
                {
                  color: '#438cf8',
                  label: '-120 - -117',
                },
                {
                  color: '#4191f9',
                  label: '-117 - -114',
                },
                {
                  color: '#3e96fa',
                  label: '-114 - -111',
                },
                {
                  color: '#3b9bf9',
                  label: '-111 - -108',
                },
                {
                  color: '#38a1f7',
                  label: '-108 - -105',
                },
                {
                  color: '#35a6f5',
                  label: '-105 - -102',
                },
                {
                  color: '#31abf2',
                  label: '-102 - -99',
                },
                {
                  color: '#2eb0ef',
                  label: '-99 - -96',
                },
                {
                  color: '#2ab6eb',
                  label: '-96 - -93',
                },
                {
                  color: '#26bbe6',
                  label: '-93 - -90',
                },
                {
                  color: '#23bfe1',
                  label: '-90 - -87',
                },
                {
                  color: '#20c4dc',
                  label: '-87 - -84',
                },
                {
                  color: '#1dc8d7',
                  label: '-84 - -81',
                },
                {
                  color: '#1bcdd2',
                  label: '-81 - -78',
                },
                {
                  color: '#19d1cc',
                  label: '-78 - -75',
                },
                {
                  color: '#18d5c7',
                  label: '-75 - -72',
                },
                {
                  color: '#18d9c1',
                  label: '-72 - -69',
                },
                {
                  color: '#18dcbc',
                  label: '-69 - -66',
                },
                {
                  color: '#19e0b8',
                  label: '-66 - -63',
                },
                {
                  color: '#1be3b3',
                  label: '-63 - -60',
                },
                {
                  color: '#1ee6ae',
                  label: '-60 - -57',
                },
                {
                  color: '#21e8a8',
                  label: '-57 - -54',
                },
                {
                  color: '#27eba2',
                  label: '-54 - -51',
                },
                {
                  color: '#2ced9c',
                  label: '-51 - -48',
                },
                {
                  color: '#32f096',
                  label: '-48 - -45',
                },
                {
                  color: '#38f28f',
                  label: '-45 - -42',
                },
                {
                  color: '#40f488',
                  label: '-42 - -39',
                },
                {
                  color: '#47f581',
                  label: '-39 - -36',
                },
                {
                  color: '#4ff77a',
                  label: '-36 - -33',
                },
                {
                  color: '#56f873',
                  label: '-33 - -30',
                },
                {
                  color: '#5ffa6c',
                  label: '-30 - -27',
                },
                {
                  color: '#67fb66',
                  label: '-27 - -24',
                },
                {
                  color: '#6ffc5f',
                  label: '-24 - -21',
                },
                {
                  color: '#78fc58',
                  label: '-21 - -18',
                },
                {
                  color: '#7ffd52',
                  label: '-18 - -15',
                },
                {
                  color: '#87fd4d',
                  label: '-15 - -12',
                },
                {
                  color: '#8efd48',
                  label: '-12 - -9',
                },
                {
                  color: '#96fc43',
                  label: '-9 - -6',
                },
                {
                  color: '#9cfc3f',
                  label: '-6 - -3',
                },
                {
                  color: '#a1fb3c',
                  label: '-3 - 0',
                },
                {
                  color: '#a6fa39',
                  label: '0 - 3',
                },
                {
                  color: '#a8f938',
                  label: '3 - 6',
                },
                {
                  color: '#acf937',
                  label: '6 - 9',
                },
                {
                  color: '#aff836',
                  label: '9 - 12',
                },
                {
                  color: '#b2f636',
                  label: '12 - 15',
                },
                {
                  color: '#b5f535',
                  label: '15 - 18',
                },
                {
                  color: '#b8f435',
                  label: '18 - 21',
                },
                {
                  color: '#bbf334',
                  label: '21 - 24',
                },
                {
                  color: '#bef234',
                  label: '24 - 27',
                },
                {
                  color: '#c1f034',
                  label: '27 - 30',
                },
                {
                  color: '#c4ef34',
                  label: '30 - 33',
                },
                {
                  color: '#c6ed34',
                  label: '33 - 36',
                },
                {
                  color: '#caeb34',
                  label: '36 - 39',
                },
                {
                  color: '#ccea34',
                  label: '39 - 42',
                },
                {
                  color: '#cfe834',
                  label: '42 - 45',
                },
                {
                  color: '#d2e635',
                  label: '45 - 48',
                },
                {
                  color: '#d5e435',
                  label: '48 - 51',
                },
                {
                  color: '#d7e335',
                  label: '51 - 54',
                },
                {
                  color: '#dae036',
                  label: '54 - 57',
                },
                {
                  color: '#dcde37',
                  label: '57 - 60',
                },
                {
                  color: '#dedd37',
                  label: '60 - 63',
                },
                {
                  color: '#e1db37',
                  label: '63 - 66',
                },
                {
                  color: '#e3d838',
                  label: '66 - 69',
                },
                {
                  color: '#e5d638',
                  label: '69 - 72',
                },
                {
                  color: '#e7d439',
                  label: '72 - 75',
                },
                {
                  color: '#ead139',
                  label: '75 - 78',
                },
                {
                  color: '#ebcf3a',
                  label: '78 - 81',
                },
                {
                  color: '#edcd3a',
                  label: '81 - 84',
                },
                {
                  color: '#efca3a',
                  label: '84 - 87',
                },
                {
                  color: '#f0c83a',
                  label: '87 - 90',
                },
                {
                  color: '#f2c63a',
                  label: '90 - 93',
                },
                {
                  color: '#f4c43a',
                  label: '93 - 96',
                },
                {
                  color: '#f5c13a',
                  label: '96 - 99',
                },
                {
                  color: '#f6bf39',
                  label: '99 - 102',
                },
                {
                  color: '#f7bc39',
                  label: '102 - 105',
                },
                {
                  color: '#f8b939',
                  label: '105 - 108',
                },
                {
                  color: '#f9b738',
                  label: '108 - 111',
                },
                {
                  color: '#fab437',
                  label: '111 - 114',
                },
                {
                  color: '#fab136',
                  label: '114 - 117',
                },
                {
                  color: '#fbaf35',
                  label: '117 - 120',
                },
                {
                  color: '#fcac34',
                  label: '120 - 123',
                },
                {
                  color: '#fca933',
                  label: '123 - 126',
                },
                {
                  color: '#fda632',
                  label: '126 - 129',
                },
                {
                  color: '#fda331',
                  label: '129 - 132',
                },
                {
                  color: '#fd9f2f',
                  label: '132 - 135',
                },
                {
                  color: '#fd9c2e',
                  label: '135 - 138',
                },
                {
                  color: '#fd992c',
                  label: '138 - 141',
                },
                {
                  color: '#fd962b',
                  label: '141 - 144',
                },
                {
                  color: '#fd932a',
                  label: '144 - 147',
                },
                {
                  color: '#fc8f28',
                  label: '147 - 150',
                },
                {
                  color: '#fc8c27',
                  label: '150 - 153',
                },
                {
                  color: '#fb8825',
                  label: '153 - 156',
                },
                {
                  color: '#fb8524',
                  label: '156 - 159',
                },
                {
                  color: '#fa8122',
                  label: '159 - 162',
                },
                {
                  color: '#fa7e21',
                  label: '162 - 165',
                },
                {
                  color: '#f97a1f',
                  label: '165 - 168',
                },
                {
                  color: '#f8771e',
                  label: '168 - 171',
                },
                {
                  color: '#f7731c',
                  label: '171 - 174',
                },
                {
                  color: '#f6701b',
                  label: '174 - 177',
                },
                {
                  color: '#f56c19',
                  label: '177 - 180',
                },
                {
                  color: '#f46918',
                  label: '180 - 183',
                },
                {
                  color: '#f36517',
                  label: '183 - 186',
                },
                {
                  color: '#f26215',
                  label: '186 - 189',
                },
                {
                  color: '#f05f14',
                  label: '189 - 192',
                },
                {
                  color: '#ef5c12',
                  label: '192 - 195',
                },
                {
                  color: '#ee5911',
                  label: '195 - 198',
                },
                {
                  color: '#ec5510',
                  label: '198 - 201',
                },
                {
                  color: '#eb520f',
                  label: '201 - 204',
                },
                {
                  color: '#ea4f0e',
                  label: '204 - 207',
                },
                {
                  color: '#e84d0d',
                  label: '207 - 210',
                },
                {
                  color: '#e64a0c',
                  label: '210 - 213',
                },
                {
                  color: '#e5470b',
                  label: '213 - 216',
                },
                {
                  color: '#e3450a',
                  label: '216 - 219',
                },
                {
                  color: '#e1430a',
                  label: '219 - 222',
                },
                {
                  color: '#e04009',
                  label: '222 - 225',
                },
                {
                  color: '#dd3e08',
                  label: '225 - 228',
                },
                {
                  color: '#dc3c07',
                  label: '228 - 231',
                },
                {
                  color: '#da3907',
                  label: '231 - 234',
                },
                {
                  color: '#d73706',
                  label: '234 - 237',
                },
                {
                  color: '#d53506',
                  label: '237 - 240',
                },
                {
                  color: '#d33305',
                  label: '240 - 243',
                },
                {
                  color: '#d13005',
                  label: '243 - 246',
                },
                {
                  color: '#ce2e04',
                  label: '246 - 249',
                },
                {
                  color: '#cc2c04',
                  label: '249 - 252',
                },
                {
                  color: '#ca2a04',
                  label: '252 - 255',
                },
                {
                  color: '#c72803',
                  label: '255 - 258',
                },
                {
                  color: '#c42603',
                  label: '258 - 261',
                },
                {
                  color: '#c22403',
                  label: '261 - 264',
                },
                {
                  color: '#bf2202',
                  label: '264 - 267',
                },
                {
                  color: '#bc2002',
                  label: '267 - 270',
                },
                {
                  color: '#b91e02',
                  label: '270 - 273',
                },
                {
                  color: '#b61d02',
                  label: '273 - 276',
                },
                {
                  color: '#b31b01',
                  label: '276 - 279',
                },
                {
                  color: '#b01901',
                  label: '279 - 282',
                },
                {
                  color: '#ad1801',
                  label: '282 - 285',
                },
                {
                  color: '#aa1601',
                  label: '285 - 288',
                },
                {
                  color: '#a71401',
                  label: '288 - 291',
                },
                {
                  color: '#a41301',
                  label: '291 - 294',
                },
                {
                  color: '#a01201',
                  label: '294 - 297',
                },
                {
                  color: '#9d1001',
                  label: '297 - 300',
                },
                {
                  color: '#990f01',
                  label: '300 - 303',
                },
                {
                  color: '#960d01',
                  label: '303 - 306',
                },
                {
                  color: '#920c01',
                  label: '306 - 309',
                },
                {
                  color: '#8e0a01',
                  label: '309 - 312',
                },
                {
                  color: '#8a0902',
                  label: '312 - 315',
                },
                {
                  color: '#870802',
                  label: '315 - 318',
                },
                {
                  color: '#830702',
                  label: '318 - 321',
                },
                {
                  color: '#7c0503',
                  label: '321 - 324',
                },
                {
                  color: '#790403',
                  label: '324 - 327',
                },
                {
                  color: '#790403',
                  label: '327 - 330',
                },
                {
                  color: '#7a0403',
                  label: '&gt; 330',
                },
              ],
              layer_id: 'l35',
              license: null,
              location_query_url: null,
              metadata_url: null,
              monitor: 'EU-climate monitor',
              monitor_id: 'm9',
              polygon_query_url: null,
              position: 'right',
              range: ['19611990', '19912020'],
              range_labels: ['1961-1990', '1991-2020'],
              regex: 'tmax_ltm_ann_.*_3035.tif',
              scale: 0.1,
              srv_path: 'eu_ltm_temperature_max/',
              theme: 'Climate & Health',
              title:
                'European annual long-term means (LTM) of maximum temperature at 1 km resolution',
              unit: '°C x 10',
              usage_examples:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur, libero vitae pellentesque sodales, urna nibh lobortis nisi, eu ultricies est dolor et tortor.',
              use_case: 'Meteo-based agricultural insurance tool',
              value_society:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur, libero vitae pellentesque sodales, urna nibh lobortis nisi, eu ultricies est dolor et tortor.',
              geo_story_id: 'g23',
            },
            {
              author: null,
              coverage: 'European',
              data_meaning:
                'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
              description:
                'European annual long-term means (LTM) maps of minimum temperature at 1 km spatial resolution, for periods 1961-1990 and 1991-2020.',
              download_url: null,
              filename: 'tmin_ltm_ann_*_3035.tif',
              geo_story: 'Climate change (Europe)',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:eu_ltm_temperature_min',
              gs_style: [
                {
                  color: '#30123b',
                  label: '&lt;= -183',
                },
                {
                  color: '#1b0d27',
                  label: '-183 - -180',
                },
                {
                  color: '#281744',
                  label: '-180 - -177',
                },
                {
                  color: '#2e1f57',
                  label: '-177 - -174',
                },
                {
                  color: '#322667',
                  label: '-174 - -171',
                },
                {
                  color: '#362c76',
                  label: '-171 - -168',
                },
                {
                  color: '#393283',
                  label: '-168 - -165',
                },
                {
                  color: '#3b3990',
                  label: '-165 - -162',
                },
                {
                  color: '#3d3e9c',
                  label: '-162 - -159',
                },
                {
                  color: '#3e44a7',
                  label: '-159 - -156',
                },
                {
                  color: '#404ab1',
                  label: '-156 - -153',
                },
                {
                  color: '#4150ba',
                  label: '-153 - -150',
                },
                {
                  color: '#4256c3',
                  label: '-150 - -147',
                },
                {
                  color: '#435bcc',
                  label: '-147 - -144',
                },
                {
                  color: '#4461d3',
                  label: '-144 - -141',
                },
                {
                  color: '#4466da',
                  label: '-141 - -138',
                },
                {
                  color: '#456ce0',
                  label: '-138 - -135',
                },
                {
                  color: '#4571e6',
                  label: '-135 - -132',
                },
                {
                  color: '#4576eb',
                  label: '-132 - -129',
                },
                {
                  color: '#447cef',
                  label: '-129 - -126',
                },
                {
                  color: '#4481f3',
                  label: '-126 - -123',
                },
                {
                  color: '#4486f6',
                  label: '-123 - -120',
                },
                {
                  color: '#438cf8',
                  label: '-120 - -117',
                },
                {
                  color: '#4191f9',
                  label: '-117 - -114',
                },
                {
                  color: '#3e96fa',
                  label: '-114 - -111',
                },
                {
                  color: '#3b9bf9',
                  label: '-111 - -108',
                },
                {
                  color: '#38a1f7',
                  label: '-108 - -105',
                },
                {
                  color: '#35a6f5',
                  label: '-105 - -102',
                },
                {
                  color: '#31abf2',
                  label: '-102 - -99',
                },
                {
                  color: '#2eb0ef',
                  label: '-99 - -96',
                },
                {
                  color: '#2ab6eb',
                  label: '-96 - -93',
                },
                {
                  color: '#26bbe6',
                  label: '-93 - -90',
                },
                {
                  color: '#23bfe1',
                  label: '-90 - -87',
                },
                {
                  color: '#20c4dc',
                  label: '-87 - -84',
                },
                {
                  color: '#1dc8d7',
                  label: '-84 - -81',
                },
                {
                  color: '#1bcdd2',
                  label: '-81 - -78',
                },
                {
                  color: '#19d1cc',
                  label: '-78 - -75',
                },
                {
                  color: '#18d5c7',
                  label: '-75 - -72',
                },
                {
                  color: '#18d9c1',
                  label: '-72 - -69',
                },
                {
                  color: '#18dcbc',
                  label: '-69 - -66',
                },
                {
                  color: '#19e0b8',
                  label: '-66 - -63',
                },
                {
                  color: '#1be3b3',
                  label: '-63 - -60',
                },
                {
                  color: '#1ee6ae',
                  label: '-60 - -57',
                },
                {
                  color: '#21e8a8',
                  label: '-57 - -54',
                },
                {
                  color: '#27eba2',
                  label: '-54 - -51',
                },
                {
                  color: '#2ced9c',
                  label: '-51 - -48',
                },
                {
                  color: '#32f096',
                  label: '-48 - -45',
                },
                {
                  color: '#38f28f',
                  label: '-45 - -42',
                },
                {
                  color: '#40f488',
                  label: '-42 - -39',
                },
                {
                  color: '#47f581',
                  label: '-39 - -36',
                },
                {
                  color: '#4ff77a',
                  label: '-36 - -33',
                },
                {
                  color: '#56f873',
                  label: '-33 - -30',
                },
                {
                  color: '#5ffa6c',
                  label: '-30 - -27',
                },
                {
                  color: '#67fb66',
                  label: '-27 - -24',
                },
                {
                  color: '#6ffc5f',
                  label: '-24 - -21',
                },
                {
                  color: '#78fc58',
                  label: '-21 - -18',
                },
                {
                  color: '#7ffd52',
                  label: '-18 - -15',
                },
                {
                  color: '#87fd4d',
                  label: '-15 - -12',
                },
                {
                  color: '#8efd48',
                  label: '-12 - -9',
                },
                {
                  color: '#96fc43',
                  label: '-9 - -6',
                },
                {
                  color: '#9cfc3f',
                  label: '-6 - -3',
                },
                {
                  color: '#a1fb3c',
                  label: '-3 - 0',
                },
                {
                  color: '#a6fa39',
                  label: '0 - 3',
                },
                {
                  color: '#a8f938',
                  label: '3 - 6',
                },
                {
                  color: '#acf937',
                  label: '6 - 9',
                },
                {
                  color: '#aff836',
                  label: '9 - 12',
                },
                {
                  color: '#b2f636',
                  label: '12 - 15',
                },
                {
                  color: '#b5f535',
                  label: '15 - 18',
                },
                {
                  color: '#b8f435',
                  label: '18 - 21',
                },
                {
                  color: '#bbf334',
                  label: '21 - 24',
                },
                {
                  color: '#bef234',
                  label: '24 - 27',
                },
                {
                  color: '#c1f034',
                  label: '27 - 30',
                },
                {
                  color: '#c4ef34',
                  label: '30 - 33',
                },
                {
                  color: '#c6ed34',
                  label: '33 - 36',
                },
                {
                  color: '#caeb34',
                  label: '36 - 39',
                },
                {
                  color: '#ccea34',
                  label: '39 - 42',
                },
                {
                  color: '#cfe834',
                  label: '42 - 45',
                },
                {
                  color: '#d2e635',
                  label: '45 - 48',
                },
                {
                  color: '#d5e435',
                  label: '48 - 51',
                },
                {
                  color: '#d7e335',
                  label: '51 - 54',
                },
                {
                  color: '#dae036',
                  label: '54 - 57',
                },
                {
                  color: '#dcde37',
                  label: '57 - 60',
                },
                {
                  color: '#dedd37',
                  label: '60 - 63',
                },
                {
                  color: '#e1db37',
                  label: '63 - 66',
                },
                {
                  color: '#e3d838',
                  label: '66 - 69',
                },
                {
                  color: '#e5d638',
                  label: '69 - 72',
                },
                {
                  color: '#e7d439',
                  label: '72 - 75',
                },
                {
                  color: '#ead139',
                  label: '75 - 78',
                },
                {
                  color: '#ebcf3a',
                  label: '78 - 81',
                },
                {
                  color: '#edcd3a',
                  label: '81 - 84',
                },
                {
                  color: '#efca3a',
                  label: '84 - 87',
                },
                {
                  color: '#f0c83a',
                  label: '87 - 90',
                },
                {
                  color: '#f2c63a',
                  label: '90 - 93',
                },
                {
                  color: '#f4c43a',
                  label: '93 - 96',
                },
                {
                  color: '#f5c13a',
                  label: '96 - 99',
                },
                {
                  color: '#f6bf39',
                  label: '99 - 102',
                },
                {
                  color: '#f7bc39',
                  label: '102 - 105',
                },
                {
                  color: '#f8b939',
                  label: '105 - 108',
                },
                {
                  color: '#f9b738',
                  label: '108 - 111',
                },
                {
                  color: '#fab437',
                  label: '111 - 114',
                },
                {
                  color: '#fab136',
                  label: '114 - 117',
                },
                {
                  color: '#fbaf35',
                  label: '117 - 120',
                },
                {
                  color: '#fcac34',
                  label: '120 - 123',
                },
                {
                  color: '#fca933',
                  label: '123 - 126',
                },
                {
                  color: '#fda632',
                  label: '126 - 129',
                },
                {
                  color: '#fda331',
                  label: '129 - 132',
                },
                {
                  color: '#fd9f2f',
                  label: '132 - 135',
                },
                {
                  color: '#fd9c2e',
                  label: '135 - 138',
                },
                {
                  color: '#fd992c',
                  label: '138 - 141',
                },
                {
                  color: '#fd962b',
                  label: '141 - 144',
                },
                {
                  color: '#fd932a',
                  label: '144 - 147',
                },
                {
                  color: '#fc8f28',
                  label: '147 - 150',
                },
                {
                  color: '#fc8c27',
                  label: '150 - 153',
                },
                {
                  color: '#fb8825',
                  label: '153 - 156',
                },
                {
                  color: '#fb8524',
                  label: '156 - 159',
                },
                {
                  color: '#fa8122',
                  label: '159 - 162',
                },
                {
                  color: '#fa7e21',
                  label: '162 - 165',
                },
                {
                  color: '#f97a1f',
                  label: '165 - 168',
                },
                {
                  color: '#f8771e',
                  label: '168 - 171',
                },
                {
                  color: '#f7731c',
                  label: '171 - 174',
                },
                {
                  color: '#f6701b',
                  label: '174 - 177',
                },
                {
                  color: '#f56c19',
                  label: '177 - 180',
                },
                {
                  color: '#f46918',
                  label: '180 - 183',
                },
                {
                  color: '#f36517',
                  label: '183 - 186',
                },
                {
                  color: '#f26215',
                  label: '186 - 189',
                },
                {
                  color: '#f05f14',
                  label: '189 - 192',
                },
                {
                  color: '#ef5c12',
                  label: '192 - 195',
                },
                {
                  color: '#ee5911',
                  label: '195 - 198',
                },
                {
                  color: '#ec5510',
                  label: '198 - 201',
                },
                {
                  color: '#eb520f',
                  label: '201 - 204',
                },
                {
                  color: '#ea4f0e',
                  label: '204 - 207',
                },
                {
                  color: '#e84d0d',
                  label: '207 - 210',
                },
                {
                  color: '#e64a0c',
                  label: '210 - 213',
                },
                {
                  color: '#e5470b',
                  label: '213 - 216',
                },
                {
                  color: '#e3450a',
                  label: '216 - 219',
                },
                {
                  color: '#e1430a',
                  label: '219 - 222',
                },
                {
                  color: '#e04009',
                  label: '222 - 225',
                },
                {
                  color: '#dd3e08',
                  label: '225 - 228',
                },
                {
                  color: '#dc3c07',
                  label: '228 - 231',
                },
                {
                  color: '#da3907',
                  label: '231 - 234',
                },
                {
                  color: '#d73706',
                  label: '234 - 237',
                },
                {
                  color: '#d53506',
                  label: '237 - 240',
                },
                {
                  color: '#d33305',
                  label: '240 - 243',
                },
                {
                  color: '#d13005',
                  label: '243 - 246',
                },
                {
                  color: '#ce2e04',
                  label: '246 - 249',
                },
                {
                  color: '#cc2c04',
                  label: '249 - 252',
                },
                {
                  color: '#ca2a04',
                  label: '252 - 255',
                },
                {
                  color: '#c72803',
                  label: '255 - 258',
                },
                {
                  color: '#c42603',
                  label: '258 - 261',
                },
                {
                  color: '#c22403',
                  label: '261 - 264',
                },
                {
                  color: '#bf2202',
                  label: '264 - 267',
                },
                {
                  color: '#bc2002',
                  label: '267 - 270',
                },
                {
                  color: '#b91e02',
                  label: '270 - 273',
                },
                {
                  color: '#b61d02',
                  label: '273 - 276',
                },
                {
                  color: '#b31b01',
                  label: '276 - 279',
                },
                {
                  color: '#b01901',
                  label: '279 - 282',
                },
                {
                  color: '#ad1801',
                  label: '282 - 285',
                },
                {
                  color: '#aa1601',
                  label: '285 - 288',
                },
                {
                  color: '#a71401',
                  label: '288 - 291',
                },
                {
                  color: '#a41301',
                  label: '291 - 294',
                },
                {
                  color: '#a01201',
                  label: '294 - 297',
                },
                {
                  color: '#9d1001',
                  label: '297 - 300',
                },
                {
                  color: '#990f01',
                  label: '300 - 303',
                },
                {
                  color: '#960d01',
                  label: '303 - 306',
                },
                {
                  color: '#920c01',
                  label: '306 - 309',
                },
                {
                  color: '#8e0a01',
                  label: '309 - 312',
                },
                {
                  color: '#8a0902',
                  label: '312 - 315',
                },
                {
                  color: '#870802',
                  label: '315 - 318',
                },
                {
                  color: '#830702',
                  label: '318 - 321',
                },
                {
                  color: '#7c0503',
                  label: '321 - 324',
                },
                {
                  color: '#790403',
                  label: '324 - 327',
                },
                {
                  color: '#790403',
                  label: '327 - 330',
                },
                {
                  color: '#7a0403',
                  label: '&gt; 330',
                },
              ],
              layer_id: 'l36',
              license: null,
              location_query_url: null,
              metadata_url: null,
              monitor: 'EU-climate monitor',
              monitor_id: 'm9',
              polygon_query_url: null,
              position: 'right',
              range: ['19611990', '19912020'],
              range_labels: ['1961-1990', '1991-2020'],
              regex: 'tmin_ltm_ann_.*_3035.tif',
              scale: 0.1,
              srv_path: 'eu_ltm_temperature_min/',
              theme: 'Climate & Health',
              title:
                'European annual long-term means (LTM) of minimum temperature at 1 km resolution',
              unit: '°C x 10',
              usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
              use_case: 'Meteo-based agricultural insurance tool',
              value_society: 'Morbi eget lacus nulla.',
              geo_story_id: 'g23',
            },
            {
              author: null,
              coverage: 'European',
              data_meaning:
                'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
              description:
                'European annual long-term means (LTM) maps of mean temperature at 1 km spatial resolution, for periods 1961-1990 and 1991-2020.',
              download_url: null,
              filename: 'tmean_ltm_ann_*_3035.tif',
              geo_story: 'Climate change (Europe)',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:eu_ltm_temperature_mean',
              gs_style: [
                {
                  color: '#30123b',
                  label: '&lt;= -183',
                },
                {
                  color: '#1b0d27',
                  label: '-183 - -180',
                },
                {
                  color: '#281744',
                  label: '-180 - -177',
                },
                {
                  color: '#2e1f57',
                  label: '-177 - -174',
                },
                {
                  color: '#322667',
                  label: '-174 - -171',
                },
                {
                  color: '#362c76',
                  label: '-171 - -168',
                },
                {
                  color: '#393283',
                  label: '-168 - -165',
                },
                {
                  color: '#3b3990',
                  label: '-165 - -162',
                },
                {
                  color: '#3d3e9c',
                  label: '-162 - -159',
                },
                {
                  color: '#3e44a7',
                  label: '-159 - -156',
                },
                {
                  color: '#404ab1',
                  label: '-156 - -153',
                },
                {
                  color: '#4150ba',
                  label: '-153 - -150',
                },
                {
                  color: '#4256c3',
                  label: '-150 - -147',
                },
                {
                  color: '#435bcc',
                  label: '-147 - -144',
                },
                {
                  color: '#4461d3',
                  label: '-144 - -141',
                },
                {
                  color: '#4466da',
                  label: '-141 - -138',
                },
                {
                  color: '#456ce0',
                  label: '-138 - -135',
                },
                {
                  color: '#4571e6',
                  label: '-135 - -132',
                },
                {
                  color: '#4576eb',
                  label: '-132 - -129',
                },
                {
                  color: '#447cef',
                  label: '-129 - -126',
                },
                {
                  color: '#4481f3',
                  label: '-126 - -123',
                },
                {
                  color: '#4486f6',
                  label: '-123 - -120',
                },
                {
                  color: '#438cf8',
                  label: '-120 - -117',
                },
                {
                  color: '#4191f9',
                  label: '-117 - -114',
                },
                {
                  color: '#3e96fa',
                  label: '-114 - -111',
                },
                {
                  color: '#3b9bf9',
                  label: '-111 - -108',
                },
                {
                  color: '#38a1f7',
                  label: '-108 - -105',
                },
                {
                  color: '#35a6f5',
                  label: '-105 - -102',
                },
                {
                  color: '#31abf2',
                  label: '-102 - -99',
                },
                {
                  color: '#2eb0ef',
                  label: '-99 - -96',
                },
                {
                  color: '#2ab6eb',
                  label: '-96 - -93',
                },
                {
                  color: '#26bbe6',
                  label: '-93 - -90',
                },
                {
                  color: '#23bfe1',
                  label: '-90 - -87',
                },
                {
                  color: '#20c4dc',
                  label: '-87 - -84',
                },
                {
                  color: '#1dc8d7',
                  label: '-84 - -81',
                },
                {
                  color: '#1bcdd2',
                  label: '-81 - -78',
                },
                {
                  color: '#19d1cc',
                  label: '-78 - -75',
                },
                {
                  color: '#18d5c7',
                  label: '-75 - -72',
                },
                {
                  color: '#18d9c1',
                  label: '-72 - -69',
                },
                {
                  color: '#18dcbc',
                  label: '-69 - -66',
                },
                {
                  color: '#19e0b8',
                  label: '-66 - -63',
                },
                {
                  color: '#1be3b3',
                  label: '-63 - -60',
                },
                {
                  color: '#1ee6ae',
                  label: '-60 - -57',
                },
                {
                  color: '#21e8a8',
                  label: '-57 - -54',
                },
                {
                  color: '#27eba2',
                  label: '-54 - -51',
                },
                {
                  color: '#2ced9c',
                  label: '-51 - -48',
                },
                {
                  color: '#32f096',
                  label: '-48 - -45',
                },
                {
                  color: '#38f28f',
                  label: '-45 - -42',
                },
                {
                  color: '#40f488',
                  label: '-42 - -39',
                },
                {
                  color: '#47f581',
                  label: '-39 - -36',
                },
                {
                  color: '#4ff77a',
                  label: '-36 - -33',
                },
                {
                  color: '#56f873',
                  label: '-33 - -30',
                },
                {
                  color: '#5ffa6c',
                  label: '-30 - -27',
                },
                {
                  color: '#67fb66',
                  label: '-27 - -24',
                },
                {
                  color: '#6ffc5f',
                  label: '-24 - -21',
                },
                {
                  color: '#78fc58',
                  label: '-21 - -18',
                },
                {
                  color: '#7ffd52',
                  label: '-18 - -15',
                },
                {
                  color: '#87fd4d',
                  label: '-15 - -12',
                },
                {
                  color: '#8efd48',
                  label: '-12 - -9',
                },
                {
                  color: '#96fc43',
                  label: '-9 - -6',
                },
                {
                  color: '#9cfc3f',
                  label: '-6 - -3',
                },
                {
                  color: '#a1fb3c',
                  label: '-3 - 0',
                },
                {
                  color: '#a6fa39',
                  label: '0 - 3',
                },
                {
                  color: '#a8f938',
                  label: '3 - 6',
                },
                {
                  color: '#acf937',
                  label: '6 - 9',
                },
                {
                  color: '#aff836',
                  label: '9 - 12',
                },
                {
                  color: '#b2f636',
                  label: '12 - 15',
                },
                {
                  color: '#b5f535',
                  label: '15 - 18',
                },
                {
                  color: '#b8f435',
                  label: '18 - 21',
                },
                {
                  color: '#bbf334',
                  label: '21 - 24',
                },
                {
                  color: '#bef234',
                  label: '24 - 27',
                },
                {
                  color: '#c1f034',
                  label: '27 - 30',
                },
                {
                  color: '#c4ef34',
                  label: '30 - 33',
                },
                {
                  color: '#c6ed34',
                  label: '33 - 36',
                },
                {
                  color: '#caeb34',
                  label: '36 - 39',
                },
                {
                  color: '#ccea34',
                  label: '39 - 42',
                },
                {
                  color: '#cfe834',
                  label: '42 - 45',
                },
                {
                  color: '#d2e635',
                  label: '45 - 48',
                },
                {
                  color: '#d5e435',
                  label: '48 - 51',
                },
                {
                  color: '#d7e335',
                  label: '51 - 54',
                },
                {
                  color: '#dae036',
                  label: '54 - 57',
                },
                {
                  color: '#dcde37',
                  label: '57 - 60',
                },
                {
                  color: '#dedd37',
                  label: '60 - 63',
                },
                {
                  color: '#e1db37',
                  label: '63 - 66',
                },
                {
                  color: '#e3d838',
                  label: '66 - 69',
                },
                {
                  color: '#e5d638',
                  label: '69 - 72',
                },
                {
                  color: '#e7d439',
                  label: '72 - 75',
                },
                {
                  color: '#ead139',
                  label: '75 - 78',
                },
                {
                  color: '#ebcf3a',
                  label: '78 - 81',
                },
                {
                  color: '#edcd3a',
                  label: '81 - 84',
                },
                {
                  color: '#efca3a',
                  label: '84 - 87',
                },
                {
                  color: '#f0c83a',
                  label: '87 - 90',
                },
                {
                  color: '#f2c63a',
                  label: '90 - 93',
                },
                {
                  color: '#f4c43a',
                  label: '93 - 96',
                },
                {
                  color: '#f5c13a',
                  label: '96 - 99',
                },
                {
                  color: '#f6bf39',
                  label: '99 - 102',
                },
                {
                  color: '#f7bc39',
                  label: '102 - 105',
                },
                {
                  color: '#f8b939',
                  label: '105 - 108',
                },
                {
                  color: '#f9b738',
                  label: '108 - 111',
                },
                {
                  color: '#fab437',
                  label: '111 - 114',
                },
                {
                  color: '#fab136',
                  label: '114 - 117',
                },
                {
                  color: '#fbaf35',
                  label: '117 - 120',
                },
                {
                  color: '#fcac34',
                  label: '120 - 123',
                },
                {
                  color: '#fca933',
                  label: '123 - 126',
                },
                {
                  color: '#fda632',
                  label: '126 - 129',
                },
                {
                  color: '#fda331',
                  label: '129 - 132',
                },
                {
                  color: '#fd9f2f',
                  label: '132 - 135',
                },
                {
                  color: '#fd9c2e',
                  label: '135 - 138',
                },
                {
                  color: '#fd992c',
                  label: '138 - 141',
                },
                {
                  color: '#fd962b',
                  label: '141 - 144',
                },
                {
                  color: '#fd932a',
                  label: '144 - 147',
                },
                {
                  color: '#fc8f28',
                  label: '147 - 150',
                },
                {
                  color: '#fc8c27',
                  label: '150 - 153',
                },
                {
                  color: '#fb8825',
                  label: '153 - 156',
                },
                {
                  color: '#fb8524',
                  label: '156 - 159',
                },
                {
                  color: '#fa8122',
                  label: '159 - 162',
                },
                {
                  color: '#fa7e21',
                  label: '162 - 165',
                },
                {
                  color: '#f97a1f',
                  label: '165 - 168',
                },
                {
                  color: '#f8771e',
                  label: '168 - 171',
                },
                {
                  color: '#f7731c',
                  label: '171 - 174',
                },
                {
                  color: '#f6701b',
                  label: '174 - 177',
                },
                {
                  color: '#f56c19',
                  label: '177 - 180',
                },
                {
                  color: '#f46918',
                  label: '180 - 183',
                },
                {
                  color: '#f36517',
                  label: '183 - 186',
                },
                {
                  color: '#f26215',
                  label: '186 - 189',
                },
                {
                  color: '#f05f14',
                  label: '189 - 192',
                },
                {
                  color: '#ef5c12',
                  label: '192 - 195',
                },
                {
                  color: '#ee5911',
                  label: '195 - 198',
                },
                {
                  color: '#ec5510',
                  label: '198 - 201',
                },
                {
                  color: '#eb520f',
                  label: '201 - 204',
                },
                {
                  color: '#ea4f0e',
                  label: '204 - 207',
                },
                {
                  color: '#e84d0d',
                  label: '207 - 210',
                },
                {
                  color: '#e64a0c',
                  label: '210 - 213',
                },
                {
                  color: '#e5470b',
                  label: '213 - 216',
                },
                {
                  color: '#e3450a',
                  label: '216 - 219',
                },
                {
                  color: '#e1430a',
                  label: '219 - 222',
                },
                {
                  color: '#e04009',
                  label: '222 - 225',
                },
                {
                  color: '#dd3e08',
                  label: '225 - 228',
                },
                {
                  color: '#dc3c07',
                  label: '228 - 231',
                },
                {
                  color: '#da3907',
                  label: '231 - 234',
                },
                {
                  color: '#d73706',
                  label: '234 - 237',
                },
                {
                  color: '#d53506',
                  label: '237 - 240',
                },
                {
                  color: '#d33305',
                  label: '240 - 243',
                },
                {
                  color: '#d13005',
                  label: '243 - 246',
                },
                {
                  color: '#ce2e04',
                  label: '246 - 249',
                },
                {
                  color: '#cc2c04',
                  label: '249 - 252',
                },
                {
                  color: '#ca2a04',
                  label: '252 - 255',
                },
                {
                  color: '#c72803',
                  label: '255 - 258',
                },
                {
                  color: '#c42603',
                  label: '258 - 261',
                },
                {
                  color: '#c22403',
                  label: '261 - 264',
                },
                {
                  color: '#bf2202',
                  label: '264 - 267',
                },
                {
                  color: '#bc2002',
                  label: '267 - 270',
                },
                {
                  color: '#b91e02',
                  label: '270 - 273',
                },
                {
                  color: '#b61d02',
                  label: '273 - 276',
                },
                {
                  color: '#b31b01',
                  label: '276 - 279',
                },
                {
                  color: '#b01901',
                  label: '279 - 282',
                },
                {
                  color: '#ad1801',
                  label: '282 - 285',
                },
                {
                  color: '#aa1601',
                  label: '285 - 288',
                },
                {
                  color: '#a71401',
                  label: '288 - 291',
                },
                {
                  color: '#a41301',
                  label: '291 - 294',
                },
                {
                  color: '#a01201',
                  label: '294 - 297',
                },
                {
                  color: '#9d1001',
                  label: '297 - 300',
                },
                {
                  color: '#990f01',
                  label: '300 - 303',
                },
                {
                  color: '#960d01',
                  label: '303 - 306',
                },
                {
                  color: '#920c01',
                  label: '306 - 309',
                },
                {
                  color: '#8e0a01',
                  label: '309 - 312',
                },
                {
                  color: '#8a0902',
                  label: '312 - 315',
                },
                {
                  color: '#870802',
                  label: '315 - 318',
                },
                {
                  color: '#830702',
                  label: '318 - 321',
                },
                {
                  color: '#7c0503',
                  label: '321 - 324',
                },
                {
                  color: '#790403',
                  label: '324 - 327',
                },
                {
                  color: '#790403',
                  label: '327 - 330',
                },
                {
                  color: '#7a0403',
                  label: '&gt; 330',
                },
              ],
              layer_id: 'l37',
              license: null,
              location_query_url: null,
              metadata_url: null,
              monitor: 'EU-climate monitor',
              monitor_id: 'm9',
              polygon_query_url: null,
              position: 'right',
              range: ['19611990', '19912020'],
              range_labels: ['1961-1990', '1991-2020'],
              regex: 'tmean_ltm_ann_.*_3035.tif',
              scale: 0.1,
              srv_path: 'eu_ltm_temperature_mean/',
              theme: 'Climate & Health',
              title: 'European annual long-term means (LTM) of mean temperature at 1 km resolution',
              unit: '°C x 10',
              usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
              use_case: 'Meteo-based agricultural insurance tool',
              value_society: 'Morbi eget lacus nulla.',
              geo_story_id: 'g23',
            },
            {
              author: null,
              coverage: 'European',
              data_meaning:
                'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
              description:
                'European annual average maps of maximum temperature at 1 km spatial resolution, for the period 1961-2020.',
              download_url: null,
              filename: 'tmax_ann_*_3035.tif',
              geo_story: 'Climate change (Europe)',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:eu_agg_ann_temperature_max',
              gs_style: [
                {
                  color: '#30123b',
                  label: '&lt;= -183',
                },
                {
                  color: '#1b0d27',
                  label: '-183 - -180',
                },
                {
                  color: '#281744',
                  label: '-180 - -177',
                },
                {
                  color: '#2e1f57',
                  label: '-177 - -174',
                },
                {
                  color: '#322667',
                  label: '-174 - -171',
                },
                {
                  color: '#362c76',
                  label: '-171 - -168',
                },
                {
                  color: '#393283',
                  label: '-168 - -165',
                },
                {
                  color: '#3b3990',
                  label: '-165 - -162',
                },
                {
                  color: '#3d3e9c',
                  label: '-162 - -159',
                },
                {
                  color: '#3e44a7',
                  label: '-159 - -156',
                },
                {
                  color: '#404ab1',
                  label: '-156 - -153',
                },
                {
                  color: '#4150ba',
                  label: '-153 - -150',
                },
                {
                  color: '#4256c3',
                  label: '-150 - -147',
                },
                {
                  color: '#435bcc',
                  label: '-147 - -144',
                },
                {
                  color: '#4461d3',
                  label: '-144 - -141',
                },
                {
                  color: '#4466da',
                  label: '-141 - -138',
                },
                {
                  color: '#456ce0',
                  label: '-138 - -135',
                },
                {
                  color: '#4571e6',
                  label: '-135 - -132',
                },
                {
                  color: '#4576eb',
                  label: '-132 - -129',
                },
                {
                  color: '#447cef',
                  label: '-129 - -126',
                },
                {
                  color: '#4481f3',
                  label: '-126 - -123',
                },
                {
                  color: '#4486f6',
                  label: '-123 - -120',
                },
                {
                  color: '#438cf8',
                  label: '-120 - -117',
                },
                {
                  color: '#4191f9',
                  label: '-117 - -114',
                },
                {
                  color: '#3e96fa',
                  label: '-114 - -111',
                },
                {
                  color: '#3b9bf9',
                  label: '-111 - -108',
                },
                {
                  color: '#38a1f7',
                  label: '-108 - -105',
                },
                {
                  color: '#35a6f5',
                  label: '-105 - -102',
                },
                {
                  color: '#31abf2',
                  label: '-102 - -99',
                },
                {
                  color: '#2eb0ef',
                  label: '-99 - -96',
                },
                {
                  color: '#2ab6eb',
                  label: '-96 - -93',
                },
                {
                  color: '#26bbe6',
                  label: '-93 - -90',
                },
                {
                  color: '#23bfe1',
                  label: '-90 - -87',
                },
                {
                  color: '#20c4dc',
                  label: '-87 - -84',
                },
                {
                  color: '#1dc8d7',
                  label: '-84 - -81',
                },
                {
                  color: '#1bcdd2',
                  label: '-81 - -78',
                },
                {
                  color: '#19d1cc',
                  label: '-78 - -75',
                },
                {
                  color: '#18d5c7',
                  label: '-75 - -72',
                },
                {
                  color: '#18d9c1',
                  label: '-72 - -69',
                },
                {
                  color: '#18dcbc',
                  label: '-69 - -66',
                },
                {
                  color: '#19e0b8',
                  label: '-66 - -63',
                },
                {
                  color: '#1be3b3',
                  label: '-63 - -60',
                },
                {
                  color: '#1ee6ae',
                  label: '-60 - -57',
                },
                {
                  color: '#21e8a8',
                  label: '-57 - -54',
                },
                {
                  color: '#27eba2',
                  label: '-54 - -51',
                },
                {
                  color: '#2ced9c',
                  label: '-51 - -48',
                },
                {
                  color: '#32f096',
                  label: '-48 - -45',
                },
                {
                  color: '#38f28f',
                  label: '-45 - -42',
                },
                {
                  color: '#40f488',
                  label: '-42 - -39',
                },
                {
                  color: '#47f581',
                  label: '-39 - -36',
                },
                {
                  color: '#4ff77a',
                  label: '-36 - -33',
                },
                {
                  color: '#56f873',
                  label: '-33 - -30',
                },
                {
                  color: '#5ffa6c',
                  label: '-30 - -27',
                },
                {
                  color: '#67fb66',
                  label: '-27 - -24',
                },
                {
                  color: '#6ffc5f',
                  label: '-24 - -21',
                },
                {
                  color: '#78fc58',
                  label: '-21 - -18',
                },
                {
                  color: '#7ffd52',
                  label: '-18 - -15',
                },
                {
                  color: '#87fd4d',
                  label: '-15 - -12',
                },
                {
                  color: '#8efd48',
                  label: '-12 - -9',
                },
                {
                  color: '#96fc43',
                  label: '-9 - -6',
                },
                {
                  color: '#9cfc3f',
                  label: '-6 - -3',
                },
                {
                  color: '#a1fb3c',
                  label: '-3 - 0',
                },
                {
                  color: '#a6fa39',
                  label: '0 - 3',
                },
                {
                  color: '#a8f938',
                  label: '3 - 6',
                },
                {
                  color: '#acf937',
                  label: '6 - 9',
                },
                {
                  color: '#aff836',
                  label: '9 - 12',
                },
                {
                  color: '#b2f636',
                  label: '12 - 15',
                },
                {
                  color: '#b5f535',
                  label: '15 - 18',
                },
                {
                  color: '#b8f435',
                  label: '18 - 21',
                },
                {
                  color: '#bbf334',
                  label: '21 - 24',
                },
                {
                  color: '#bef234',
                  label: '24 - 27',
                },
                {
                  color: '#c1f034',
                  label: '27 - 30',
                },
                {
                  color: '#c4ef34',
                  label: '30 - 33',
                },
                {
                  color: '#c6ed34',
                  label: '33 - 36',
                },
                {
                  color: '#caeb34',
                  label: '36 - 39',
                },
                {
                  color: '#ccea34',
                  label: '39 - 42',
                },
                {
                  color: '#cfe834',
                  label: '42 - 45',
                },
                {
                  color: '#d2e635',
                  label: '45 - 48',
                },
                {
                  color: '#d5e435',
                  label: '48 - 51',
                },
                {
                  color: '#d7e335',
                  label: '51 - 54',
                },
                {
                  color: '#dae036',
                  label: '54 - 57',
                },
                {
                  color: '#dcde37',
                  label: '57 - 60',
                },
                {
                  color: '#dedd37',
                  label: '60 - 63',
                },
                {
                  color: '#e1db37',
                  label: '63 - 66',
                },
                {
                  color: '#e3d838',
                  label: '66 - 69',
                },
                {
                  color: '#e5d638',
                  label: '69 - 72',
                },
                {
                  color: '#e7d439',
                  label: '72 - 75',
                },
                {
                  color: '#ead139',
                  label: '75 - 78',
                },
                {
                  color: '#ebcf3a',
                  label: '78 - 81',
                },
                {
                  color: '#edcd3a',
                  label: '81 - 84',
                },
                {
                  color: '#efca3a',
                  label: '84 - 87',
                },
                {
                  color: '#f0c83a',
                  label: '87 - 90',
                },
                {
                  color: '#f2c63a',
                  label: '90 - 93',
                },
                {
                  color: '#f4c43a',
                  label: '93 - 96',
                },
                {
                  color: '#f5c13a',
                  label: '96 - 99',
                },
                {
                  color: '#f6bf39',
                  label: '99 - 102',
                },
                {
                  color: '#f7bc39',
                  label: '102 - 105',
                },
                {
                  color: '#f8b939',
                  label: '105 - 108',
                },
                {
                  color: '#f9b738',
                  label: '108 - 111',
                },
                {
                  color: '#fab437',
                  label: '111 - 114',
                },
                {
                  color: '#fab136',
                  label: '114 - 117',
                },
                {
                  color: '#fbaf35',
                  label: '117 - 120',
                },
                {
                  color: '#fcac34',
                  label: '120 - 123',
                },
                {
                  color: '#fca933',
                  label: '123 - 126',
                },
                {
                  color: '#fda632',
                  label: '126 - 129',
                },
                {
                  color: '#fda331',
                  label: '129 - 132',
                },
                {
                  color: '#fd9f2f',
                  label: '132 - 135',
                },
                {
                  color: '#fd9c2e',
                  label: '135 - 138',
                },
                {
                  color: '#fd992c',
                  label: '138 - 141',
                },
                {
                  color: '#fd962b',
                  label: '141 - 144',
                },
                {
                  color: '#fd932a',
                  label: '144 - 147',
                },
                {
                  color: '#fc8f28',
                  label: '147 - 150',
                },
                {
                  color: '#fc8c27',
                  label: '150 - 153',
                },
                {
                  color: '#fb8825',
                  label: '153 - 156',
                },
                {
                  color: '#fb8524',
                  label: '156 - 159',
                },
                {
                  color: '#fa8122',
                  label: '159 - 162',
                },
                {
                  color: '#fa7e21',
                  label: '162 - 165',
                },
                {
                  color: '#f97a1f',
                  label: '165 - 168',
                },
                {
                  color: '#f8771e',
                  label: '168 - 171',
                },
                {
                  color: '#f7731c',
                  label: '171 - 174',
                },
                {
                  color: '#f6701b',
                  label: '174 - 177',
                },
                {
                  color: '#f56c19',
                  label: '177 - 180',
                },
                {
                  color: '#f46918',
                  label: '180 - 183',
                },
                {
                  color: '#f36517',
                  label: '183 - 186',
                },
                {
                  color: '#f26215',
                  label: '186 - 189',
                },
                {
                  color: '#f05f14',
                  label: '189 - 192',
                },
                {
                  color: '#ef5c12',
                  label: '192 - 195',
                },
                {
                  color: '#ee5911',
                  label: '195 - 198',
                },
                {
                  color: '#ec5510',
                  label: '198 - 201',
                },
                {
                  color: '#eb520f',
                  label: '201 - 204',
                },
                {
                  color: '#ea4f0e',
                  label: '204 - 207',
                },
                {
                  color: '#e84d0d',
                  label: '207 - 210',
                },
                {
                  color: '#e64a0c',
                  label: '210 - 213',
                },
                {
                  color: '#e5470b',
                  label: '213 - 216',
                },
                {
                  color: '#e3450a',
                  label: '216 - 219',
                },
                {
                  color: '#e1430a',
                  label: '219 - 222',
                },
                {
                  color: '#e04009',
                  label: '222 - 225',
                },
                {
                  color: '#dd3e08',
                  label: '225 - 228',
                },
                {
                  color: '#dc3c07',
                  label: '228 - 231',
                },
                {
                  color: '#da3907',
                  label: '231 - 234',
                },
                {
                  color: '#d73706',
                  label: '234 - 237',
                },
                {
                  color: '#d53506',
                  label: '237 - 240',
                },
                {
                  color: '#d33305',
                  label: '240 - 243',
                },
                {
                  color: '#d13005',
                  label: '243 - 246',
                },
                {
                  color: '#ce2e04',
                  label: '246 - 249',
                },
                {
                  color: '#cc2c04',
                  label: '249 - 252',
                },
                {
                  color: '#ca2a04',
                  label: '252 - 255',
                },
                {
                  color: '#c72803',
                  label: '255 - 258',
                },
                {
                  color: '#c42603',
                  label: '258 - 261',
                },
                {
                  color: '#c22403',
                  label: '261 - 264',
                },
                {
                  color: '#bf2202',
                  label: '264 - 267',
                },
                {
                  color: '#bc2002',
                  label: '267 - 270',
                },
                {
                  color: '#b91e02',
                  label: '270 - 273',
                },
                {
                  color: '#b61d02',
                  label: '273 - 276',
                },
                {
                  color: '#b31b01',
                  label: '276 - 279',
                },
                {
                  color: '#b01901',
                  label: '279 - 282',
                },
                {
                  color: '#ad1801',
                  label: '282 - 285',
                },
                {
                  color: '#aa1601',
                  label: '285 - 288',
                },
                {
                  color: '#a71401',
                  label: '288 - 291',
                },
                {
                  color: '#a41301',
                  label: '291 - 294',
                },
                {
                  color: '#a01201',
                  label: '294 - 297',
                },
                {
                  color: '#9d1001',
                  label: '297 - 300',
                },
                {
                  color: '#990f01',
                  label: '300 - 303',
                },
                {
                  color: '#960d01',
                  label: '303 - 306',
                },
                {
                  color: '#920c01',
                  label: '306 - 309',
                },
                {
                  color: '#8e0a01',
                  label: '309 - 312',
                },
                {
                  color: '#8a0902',
                  label: '312 - 315',
                },
                {
                  color: '#870802',
                  label: '315 - 318',
                },
                {
                  color: '#830702',
                  label: '318 - 321',
                },
                {
                  color: '#7c0503',
                  label: '321 - 324',
                },
                {
                  color: '#790403',
                  label: '324 - 327',
                },
                {
                  color: '#790403',
                  label: '327 - 330',
                },
                {
                  color: '#7a0403',
                  label: '&gt; 330',
                },
              ],
              layer_id: 'l40',
              license: null,
              location_query_url: null,
              metadata_url: null,
              monitor: 'EU-climate monitor',
              monitor_id: 'm9',
              polygon_query_url: null,
              position: 'right',
              range: [
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
              ],
              range_labels: [
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
              ],
              regex: 'tmax_ann_.*_3035',
              scale: 0.1,
              srv_path: 'eu_agg_ann_temperature_max/',
              theme: 'Climate & Health',
              title: 'European annual averages of maximum temperature at 1 km resolution',
              unit: '°C x 10',
              usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
              use_case: 'Meteo-based agricultural insurance tool',
              value_society: 'Morbi eget lacus nulla.',
              geo_story_id: 'g23',
            },
            {
              author: null,
              coverage: 'European',
              data_meaning:
                'Sed malesuada nulla ultricies, feugiat ante ac, eleifend nisl. Etiam pellentesque laoreet justo at faucibus. Nam at hendrerit nulla',
              description:
                'European annual average maps of minimum temperature at 1 km spatial resolution, for the period 1961-2020.',
              download_url: null,
              filename: 'tmin_ann_*_3035.tif',
              geo_story: 'Climate change (Europe)',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:eu_agg_ann_temperature_min',
              gs_style: [
                {
                  color: '#30123b',
                  label: '&lt;= -183',
                },
                {
                  color: '#1b0d27',
                  label: '-183 - -180',
                },
                {
                  color: '#281744',
                  label: '-180 - -177',
                },
                {
                  color: '#2e1f57',
                  label: '-177 - -174',
                },
                {
                  color: '#322667',
                  label: '-174 - -171',
                },
                {
                  color: '#362c76',
                  label: '-171 - -168',
                },
                {
                  color: '#393283',
                  label: '-168 - -165',
                },
                {
                  color: '#3b3990',
                  label: '-165 - -162',
                },
                {
                  color: '#3d3e9c',
                  label: '-162 - -159',
                },
                {
                  color: '#3e44a7',
                  label: '-159 - -156',
                },
                {
                  color: '#404ab1',
                  label: '-156 - -153',
                },
                {
                  color: '#4150ba',
                  label: '-153 - -150',
                },
                {
                  color: '#4256c3',
                  label: '-150 - -147',
                },
                {
                  color: '#435bcc',
                  label: '-147 - -144',
                },
                {
                  color: '#4461d3',
                  label: '-144 - -141',
                },
                {
                  color: '#4466da',
                  label: '-141 - -138',
                },
                {
                  color: '#456ce0',
                  label: '-138 - -135',
                },
                {
                  color: '#4571e6',
                  label: '-135 - -132',
                },
                {
                  color: '#4576eb',
                  label: '-132 - -129',
                },
                {
                  color: '#447cef',
                  label: '-129 - -126',
                },
                {
                  color: '#4481f3',
                  label: '-126 - -123',
                },
                {
                  color: '#4486f6',
                  label: '-123 - -120',
                },
                {
                  color: '#438cf8',
                  label: '-120 - -117',
                },
                {
                  color: '#4191f9',
                  label: '-117 - -114',
                },
                {
                  color: '#3e96fa',
                  label: '-114 - -111',
                },
                {
                  color: '#3b9bf9',
                  label: '-111 - -108',
                },
                {
                  color: '#38a1f7',
                  label: '-108 - -105',
                },
                {
                  color: '#35a6f5',
                  label: '-105 - -102',
                },
                {
                  color: '#31abf2',
                  label: '-102 - -99',
                },
                {
                  color: '#2eb0ef',
                  label: '-99 - -96',
                },
                {
                  color: '#2ab6eb',
                  label: '-96 - -93',
                },
                {
                  color: '#26bbe6',
                  label: '-93 - -90',
                },
                {
                  color: '#23bfe1',
                  label: '-90 - -87',
                },
                {
                  color: '#20c4dc',
                  label: '-87 - -84',
                },
                {
                  color: '#1dc8d7',
                  label: '-84 - -81',
                },
                {
                  color: '#1bcdd2',
                  label: '-81 - -78',
                },
                {
                  color: '#19d1cc',
                  label: '-78 - -75',
                },
                {
                  color: '#18d5c7',
                  label: '-75 - -72',
                },
                {
                  color: '#18d9c1',
                  label: '-72 - -69',
                },
                {
                  color: '#18dcbc',
                  label: '-69 - -66',
                },
                {
                  color: '#19e0b8',
                  label: '-66 - -63',
                },
                {
                  color: '#1be3b3',
                  label: '-63 - -60',
                },
                {
                  color: '#1ee6ae',
                  label: '-60 - -57',
                },
                {
                  color: '#21e8a8',
                  label: '-57 - -54',
                },
                {
                  color: '#27eba2',
                  label: '-54 - -51',
                },
                {
                  color: '#2ced9c',
                  label: '-51 - -48',
                },
                {
                  color: '#32f096',
                  label: '-48 - -45',
                },
                {
                  color: '#38f28f',
                  label: '-45 - -42',
                },
                {
                  color: '#40f488',
                  label: '-42 - -39',
                },
                {
                  color: '#47f581',
                  label: '-39 - -36',
                },
                {
                  color: '#4ff77a',
                  label: '-36 - -33',
                },
                {
                  color: '#56f873',
                  label: '-33 - -30',
                },
                {
                  color: '#5ffa6c',
                  label: '-30 - -27',
                },
                {
                  color: '#67fb66',
                  label: '-27 - -24',
                },
                {
                  color: '#6ffc5f',
                  label: '-24 - -21',
                },
                {
                  color: '#78fc58',
                  label: '-21 - -18',
                },
                {
                  color: '#7ffd52',
                  label: '-18 - -15',
                },
                {
                  color: '#87fd4d',
                  label: '-15 - -12',
                },
                {
                  color: '#8efd48',
                  label: '-12 - -9',
                },
                {
                  color: '#96fc43',
                  label: '-9 - -6',
                },
                {
                  color: '#9cfc3f',
                  label: '-6 - -3',
                },
                {
                  color: '#a1fb3c',
                  label: '-3 - 0',
                },
                {
                  color: '#a6fa39',
                  label: '0 - 3',
                },
                {
                  color: '#a8f938',
                  label: '3 - 6',
                },
                {
                  color: '#acf937',
                  label: '6 - 9',
                },
                {
                  color: '#aff836',
                  label: '9 - 12',
                },
                {
                  color: '#b2f636',
                  label: '12 - 15',
                },
                {
                  color: '#b5f535',
                  label: '15 - 18',
                },
                {
                  color: '#b8f435',
                  label: '18 - 21',
                },
                {
                  color: '#bbf334',
                  label: '21 - 24',
                },
                {
                  color: '#bef234',
                  label: '24 - 27',
                },
                {
                  color: '#c1f034',
                  label: '27 - 30',
                },
                {
                  color: '#c4ef34',
                  label: '30 - 33',
                },
                {
                  color: '#c6ed34',
                  label: '33 - 36',
                },
                {
                  color: '#caeb34',
                  label: '36 - 39',
                },
                {
                  color: '#ccea34',
                  label: '39 - 42',
                },
                {
                  color: '#cfe834',
                  label: '42 - 45',
                },
                {
                  color: '#d2e635',
                  label: '45 - 48',
                },
                {
                  color: '#d5e435',
                  label: '48 - 51',
                },
                {
                  color: '#d7e335',
                  label: '51 - 54',
                },
                {
                  color: '#dae036',
                  label: '54 - 57',
                },
                {
                  color: '#dcde37',
                  label: '57 - 60',
                },
                {
                  color: '#dedd37',
                  label: '60 - 63',
                },
                {
                  color: '#e1db37',
                  label: '63 - 66',
                },
                {
                  color: '#e3d838',
                  label: '66 - 69',
                },
                {
                  color: '#e5d638',
                  label: '69 - 72',
                },
                {
                  color: '#e7d439',
                  label: '72 - 75',
                },
                {
                  color: '#ead139',
                  label: '75 - 78',
                },
                {
                  color: '#ebcf3a',
                  label: '78 - 81',
                },
                {
                  color: '#edcd3a',
                  label: '81 - 84',
                },
                {
                  color: '#efca3a',
                  label: '84 - 87',
                },
                {
                  color: '#f0c83a',
                  label: '87 - 90',
                },
                {
                  color: '#f2c63a',
                  label: '90 - 93',
                },
                {
                  color: '#f4c43a',
                  label: '93 - 96',
                },
                {
                  color: '#f5c13a',
                  label: '96 - 99',
                },
                {
                  color: '#f6bf39',
                  label: '99 - 102',
                },
                {
                  color: '#f7bc39',
                  label: '102 - 105',
                },
                {
                  color: '#f8b939',
                  label: '105 - 108',
                },
                {
                  color: '#f9b738',
                  label: '108 - 111',
                },
                {
                  color: '#fab437',
                  label: '111 - 114',
                },
                {
                  color: '#fab136',
                  label: '114 - 117',
                },
                {
                  color: '#fbaf35',
                  label: '117 - 120',
                },
                {
                  color: '#fcac34',
                  label: '120 - 123',
                },
                {
                  color: '#fca933',
                  label: '123 - 126',
                },
                {
                  color: '#fda632',
                  label: '126 - 129',
                },
                {
                  color: '#fda331',
                  label: '129 - 132',
                },
                {
                  color: '#fd9f2f',
                  label: '132 - 135',
                },
                {
                  color: '#fd9c2e',
                  label: '135 - 138',
                },
                {
                  color: '#fd992c',
                  label: '138 - 141',
                },
                {
                  color: '#fd962b',
                  label: '141 - 144',
                },
                {
                  color: '#fd932a',
                  label: '144 - 147',
                },
                {
                  color: '#fc8f28',
                  label: '147 - 150',
                },
                {
                  color: '#fc8c27',
                  label: '150 - 153',
                },
                {
                  color: '#fb8825',
                  label: '153 - 156',
                },
                {
                  color: '#fb8524',
                  label: '156 - 159',
                },
                {
                  color: '#fa8122',
                  label: '159 - 162',
                },
                {
                  color: '#fa7e21',
                  label: '162 - 165',
                },
                {
                  color: '#f97a1f',
                  label: '165 - 168',
                },
                {
                  color: '#f8771e',
                  label: '168 - 171',
                },
                {
                  color: '#f7731c',
                  label: '171 - 174',
                },
                {
                  color: '#f6701b',
                  label: '174 - 177',
                },
                {
                  color: '#f56c19',
                  label: '177 - 180',
                },
                {
                  color: '#f46918',
                  label: '180 - 183',
                },
                {
                  color: '#f36517',
                  label: '183 - 186',
                },
                {
                  color: '#f26215',
                  label: '186 - 189',
                },
                {
                  color: '#f05f14',
                  label: '189 - 192',
                },
                {
                  color: '#ef5c12',
                  label: '192 - 195',
                },
                {
                  color: '#ee5911',
                  label: '195 - 198',
                },
                {
                  color: '#ec5510',
                  label: '198 - 201',
                },
                {
                  color: '#eb520f',
                  label: '201 - 204',
                },
                {
                  color: '#ea4f0e',
                  label: '204 - 207',
                },
                {
                  color: '#e84d0d',
                  label: '207 - 210',
                },
                {
                  color: '#e64a0c',
                  label: '210 - 213',
                },
                {
                  color: '#e5470b',
                  label: '213 - 216',
                },
                {
                  color: '#e3450a',
                  label: '216 - 219',
                },
                {
                  color: '#e1430a',
                  label: '219 - 222',
                },
                {
                  color: '#e04009',
                  label: '222 - 225',
                },
                {
                  color: '#dd3e08',
                  label: '225 - 228',
                },
                {
                  color: '#dc3c07',
                  label: '228 - 231',
                },
                {
                  color: '#da3907',
                  label: '231 - 234',
                },
                {
                  color: '#d73706',
                  label: '234 - 237',
                },
                {
                  color: '#d53506',
                  label: '237 - 240',
                },
                {
                  color: '#d33305',
                  label: '240 - 243',
                },
                {
                  color: '#d13005',
                  label: '243 - 246',
                },
                {
                  color: '#ce2e04',
                  label: '246 - 249',
                },
                {
                  color: '#cc2c04',
                  label: '249 - 252',
                },
                {
                  color: '#ca2a04',
                  label: '252 - 255',
                },
                {
                  color: '#c72803',
                  label: '255 - 258',
                },
                {
                  color: '#c42603',
                  label: '258 - 261',
                },
                {
                  color: '#c22403',
                  label: '261 - 264',
                },
                {
                  color: '#bf2202',
                  label: '264 - 267',
                },
                {
                  color: '#bc2002',
                  label: '267 - 270',
                },
                {
                  color: '#b91e02',
                  label: '270 - 273',
                },
                {
                  color: '#b61d02',
                  label: '273 - 276',
                },
                {
                  color: '#b31b01',
                  label: '276 - 279',
                },
                {
                  color: '#b01901',
                  label: '279 - 282',
                },
                {
                  color: '#ad1801',
                  label: '282 - 285',
                },
                {
                  color: '#aa1601',
                  label: '285 - 288',
                },
                {
                  color: '#a71401',
                  label: '288 - 291',
                },
                {
                  color: '#a41301',
                  label: '291 - 294',
                },
                {
                  color: '#a01201',
                  label: '294 - 297',
                },
                {
                  color: '#9d1001',
                  label: '297 - 300',
                },
                {
                  color: '#990f01',
                  label: '300 - 303',
                },
                {
                  color: '#960d01',
                  label: '303 - 306',
                },
                {
                  color: '#920c01',
                  label: '306 - 309',
                },
                {
                  color: '#8e0a01',
                  label: '309 - 312',
                },
                {
                  color: '#8a0902',
                  label: '312 - 315',
                },
                {
                  color: '#870802',
                  label: '315 - 318',
                },
                {
                  color: '#830702',
                  label: '318 - 321',
                },
                {
                  color: '#7c0503',
                  label: '321 - 324',
                },
                {
                  color: '#790403',
                  label: '324 - 327',
                },
                {
                  color: '#790403',
                  label: '327 - 330',
                },
                {
                  color: '#7a0403',
                  label: '&gt; 330',
                },
              ],
              layer_id: 'l41',
              license: null,
              location_query_url: null,
              metadata_url: null,
              monitor: 'EU-climate monitor',
              monitor_id: 'm9',
              polygon_query_url: null,
              position: 'right',
              range: [
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
              ],
              range_labels: [
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
              ],
              regex: 'tmin_ann_.*_3035',
              scale: 0.1,
              srv_path: 'eu_agg_ann_temperature_min/',
              theme: 'Climate & Health',
              title: 'European annual averages of minimum temperature at 1 km resolution',
              unit: '°C x 10',
              usage_examples: 'Vivamus vel eros a risus pretium ornare porta at nulla.',
              use_case: 'Meteo-based agricultural insurance tool',
              value_society: 'Morbi eget lacus nulla.',
              geo_story_id: 'g23',
            },
            {
              author: null,
              coverage: 'European',
              data_meaning:
                'Nullam eu risus dapibus odio cursus iaculis eget vel lacus. Ut id eros ac velit tincidunt condimentum eget eu erat. Aliquam nec semper sem.',
              description:
                'European annual average maps of mean temperature at 1 km spatial resolution, for the period 1961-2020.',
              download_url: null,
              filename: 'tmean_ann_*_3035.tif',
              geo_story: 'Climate change (Europe)',
              gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
              gs_dimension: 'DIM_DATE',
              gs_name: 'oem:eu_agg_ann_temperature_mean',
              gs_style: [
                {
                  color: '#30123b',
                  label: '&lt;= -183',
                },
                {
                  color: '#1b0d27',
                  label: '-183 - -180',
                },
                {
                  color: '#281744',
                  label: '-180 - -177',
                },
                {
                  color: '#2e1f57',
                  label: '-177 - -174',
                },
                {
                  color: '#322667',
                  label: '-174 - -171',
                },
                {
                  color: '#362c76',
                  label: '-171 - -168',
                },
                {
                  color: '#393283',
                  label: '-168 - -165',
                },
                {
                  color: '#3b3990',
                  label: '-165 - -162',
                },
                {
                  color: '#3d3e9c',
                  label: '-162 - -159',
                },
                {
                  color: '#3e44a7',
                  label: '-159 - -156',
                },
                {
                  color: '#404ab1',
                  label: '-156 - -153',
                },
                {
                  color: '#4150ba',
                  label: '-153 - -150',
                },
                {
                  color: '#4256c3',
                  label: '-150 - -147',
                },
                {
                  color: '#435bcc',
                  label: '-147 - -144',
                },
                {
                  color: '#4461d3',
                  label: '-144 - -141',
                },
                {
                  color: '#4466da',
                  label: '-141 - -138',
                },
                {
                  color: '#456ce0',
                  label: '-138 - -135',
                },
                {
                  color: '#4571e6',
                  label: '-135 - -132',
                },
                {
                  color: '#4576eb',
                  label: '-132 - -129',
                },
                {
                  color: '#447cef',
                  label: '-129 - -126',
                },
                {
                  color: '#4481f3',
                  label: '-126 - -123',
                },
                {
                  color: '#4486f6',
                  label: '-123 - -120',
                },
                {
                  color: '#438cf8',
                  label: '-120 - -117',
                },
                {
                  color: '#4191f9',
                  label: '-117 - -114',
                },
                {
                  color: '#3e96fa',
                  label: '-114 - -111',
                },
                {
                  color: '#3b9bf9',
                  label: '-111 - -108',
                },
                {
                  color: '#38a1f7',
                  label: '-108 - -105',
                },
                {
                  color: '#35a6f5',
                  label: '-105 - -102',
                },
                {
                  color: '#31abf2',
                  label: '-102 - -99',
                },
                {
                  color: '#2eb0ef',
                  label: '-99 - -96',
                },
                {
                  color: '#2ab6eb',
                  label: '-96 - -93',
                },
                {
                  color: '#26bbe6',
                  label: '-93 - -90',
                },
                {
                  color: '#23bfe1',
                  label: '-90 - -87',
                },
                {
                  color: '#20c4dc',
                  label: '-87 - -84',
                },
                {
                  color: '#1dc8d7',
                  label: '-84 - -81',
                },
                {
                  color: '#1bcdd2',
                  label: '-81 - -78',
                },
                {
                  color: '#19d1cc',
                  label: '-78 - -75',
                },
                {
                  color: '#18d5c7',
                  label: '-75 - -72',
                },
                {
                  color: '#18d9c1',
                  label: '-72 - -69',
                },
                {
                  color: '#18dcbc',
                  label: '-69 - -66',
                },
                {
                  color: '#19e0b8',
                  label: '-66 - -63',
                },
                {
                  color: '#1be3b3',
                  label: '-63 - -60',
                },
                {
                  color: '#1ee6ae',
                  label: '-60 - -57',
                },
                {
                  color: '#21e8a8',
                  label: '-57 - -54',
                },
                {
                  color: '#27eba2',
                  label: '-54 - -51',
                },
                {
                  color: '#2ced9c',
                  label: '-51 - -48',
                },
                {
                  color: '#32f096',
                  label: '-48 - -45',
                },
                {
                  color: '#38f28f',
                  label: '-45 - -42',
                },
                {
                  color: '#40f488',
                  label: '-42 - -39',
                },
                {
                  color: '#47f581',
                  label: '-39 - -36',
                },
                {
                  color: '#4ff77a',
                  label: '-36 - -33',
                },
                {
                  color: '#56f873',
                  label: '-33 - -30',
                },
                {
                  color: '#5ffa6c',
                  label: '-30 - -27',
                },
                {
                  color: '#67fb66',
                  label: '-27 - -24',
                },
                {
                  color: '#6ffc5f',
                  label: '-24 - -21',
                },
                {
                  color: '#78fc58',
                  label: '-21 - -18',
                },
                {
                  color: '#7ffd52',
                  label: '-18 - -15',
                },
                {
                  color: '#87fd4d',
                  label: '-15 - -12',
                },
                {
                  color: '#8efd48',
                  label: '-12 - -9',
                },
                {
                  color: '#96fc43',
                  label: '-9 - -6',
                },
                {
                  color: '#9cfc3f',
                  label: '-6 - -3',
                },
                {
                  color: '#a1fb3c',
                  label: '-3 - 0',
                },
                {
                  color: '#a6fa39',
                  label: '0 - 3',
                },
                {
                  color: '#a8f938',
                  label: '3 - 6',
                },
                {
                  color: '#acf937',
                  label: '6 - 9',
                },
                {
                  color: '#aff836',
                  label: '9 - 12',
                },
                {
                  color: '#b2f636',
                  label: '12 - 15',
                },
                {
                  color: '#b5f535',
                  label: '15 - 18',
                },
                {
                  color: '#b8f435',
                  label: '18 - 21',
                },
                {
                  color: '#bbf334',
                  label: '21 - 24',
                },
                {
                  color: '#bef234',
                  label: '24 - 27',
                },
                {
                  color: '#c1f034',
                  label: '27 - 30',
                },
                {
                  color: '#c4ef34',
                  label: '30 - 33',
                },
                {
                  color: '#c6ed34',
                  label: '33 - 36',
                },
                {
                  color: '#caeb34',
                  label: '36 - 39',
                },
                {
                  color: '#ccea34',
                  label: '39 - 42',
                },
                {
                  color: '#cfe834',
                  label: '42 - 45',
                },
                {
                  color: '#d2e635',
                  label: '45 - 48',
                },
                {
                  color: '#d5e435',
                  label: '48 - 51',
                },
                {
                  color: '#d7e335',
                  label: '51 - 54',
                },
                {
                  color: '#dae036',
                  label: '54 - 57',
                },
                {
                  color: '#dcde37',
                  label: '57 - 60',
                },
                {
                  color: '#dedd37',
                  label: '60 - 63',
                },
                {
                  color: '#e1db37',
                  label: '63 - 66',
                },
                {
                  color: '#e3d838',
                  label: '66 - 69',
                },
                {
                  color: '#e5d638',
                  label: '69 - 72',
                },
                {
                  color: '#e7d439',
                  label: '72 - 75',
                },
                {
                  color: '#ead139',
                  label: '75 - 78',
                },
                {
                  color: '#ebcf3a',
                  label: '78 - 81',
                },
                {
                  color: '#edcd3a',
                  label: '81 - 84',
                },
                {
                  color: '#efca3a',
                  label: '84 - 87',
                },
                {
                  color: '#f0c83a',
                  label: '87 - 90',
                },
                {
                  color: '#f2c63a',
                  label: '90 - 93',
                },
                {
                  color: '#f4c43a',
                  label: '93 - 96',
                },
                {
                  color: '#f5c13a',
                  label: '96 - 99',
                },
                {
                  color: '#f6bf39',
                  label: '99 - 102',
                },
                {
                  color: '#f7bc39',
                  label: '102 - 105',
                },
                {
                  color: '#f8b939',
                  label: '105 - 108',
                },
                {
                  color: '#f9b738',
                  label: '108 - 111',
                },
                {
                  color: '#fab437',
                  label: '111 - 114',
                },
                {
                  color: '#fab136',
                  label: '114 - 117',
                },
                {
                  color: '#fbaf35',
                  label: '117 - 120',
                },
                {
                  color: '#fcac34',
                  label: '120 - 123',
                },
                {
                  color: '#fca933',
                  label: '123 - 126',
                },
                {
                  color: '#fda632',
                  label: '126 - 129',
                },
                {
                  color: '#fda331',
                  label: '129 - 132',
                },
                {
                  color: '#fd9f2f',
                  label: '132 - 135',
                },
                {
                  color: '#fd9c2e',
                  label: '135 - 138',
                },
                {
                  color: '#fd992c',
                  label: '138 - 141',
                },
                {
                  color: '#fd962b',
                  label: '141 - 144',
                },
                {
                  color: '#fd932a',
                  label: '144 - 147',
                },
                {
                  color: '#fc8f28',
                  label: '147 - 150',
                },
                {
                  color: '#fc8c27',
                  label: '150 - 153',
                },
                {
                  color: '#fb8825',
                  label: '153 - 156',
                },
                {
                  color: '#fb8524',
                  label: '156 - 159',
                },
                {
                  color: '#fa8122',
                  label: '159 - 162',
                },
                {
                  color: '#fa7e21',
                  label: '162 - 165',
                },
                {
                  color: '#f97a1f',
                  label: '165 - 168',
                },
                {
                  color: '#f8771e',
                  label: '168 - 171',
                },
                {
                  color: '#f7731c',
                  label: '171 - 174',
                },
                {
                  color: '#f6701b',
                  label: '174 - 177',
                },
                {
                  color: '#f56c19',
                  label: '177 - 180',
                },
                {
                  color: '#f46918',
                  label: '180 - 183',
                },
                {
                  color: '#f36517',
                  label: '183 - 186',
                },
                {
                  color: '#f26215',
                  label: '186 - 189',
                },
                {
                  color: '#f05f14',
                  label: '189 - 192',
                },
                {
                  color: '#ef5c12',
                  label: '192 - 195',
                },
                {
                  color: '#ee5911',
                  label: '195 - 198',
                },
                {
                  color: '#ec5510',
                  label: '198 - 201',
                },
                {
                  color: '#eb520f',
                  label: '201 - 204',
                },
                {
                  color: '#ea4f0e',
                  label: '204 - 207',
                },
                {
                  color: '#e84d0d',
                  label: '207 - 210',
                },
                {
                  color: '#e64a0c',
                  label: '210 - 213',
                },
                {
                  color: '#e5470b',
                  label: '213 - 216',
                },
                {
                  color: '#e3450a',
                  label: '216 - 219',
                },
                {
                  color: '#e1430a',
                  label: '219 - 222',
                },
                {
                  color: '#e04009',
                  label: '222 - 225',
                },
                {
                  color: '#dd3e08',
                  label: '225 - 228',
                },
                {
                  color: '#dc3c07',
                  label: '228 - 231',
                },
                {
                  color: '#da3907',
                  label: '231 - 234',
                },
                {
                  color: '#d73706',
                  label: '234 - 237',
                },
                {
                  color: '#d53506',
                  label: '237 - 240',
                },
                {
                  color: '#d33305',
                  label: '240 - 243',
                },
                {
                  color: '#d13005',
                  label: '243 - 246',
                },
                {
                  color: '#ce2e04',
                  label: '246 - 249',
                },
                {
                  color: '#cc2c04',
                  label: '249 - 252',
                },
                {
                  color: '#ca2a04',
                  label: '252 - 255',
                },
                {
                  color: '#c72803',
                  label: '255 - 258',
                },
                {
                  color: '#c42603',
                  label: '258 - 261',
                },
                {
                  color: '#c22403',
                  label: '261 - 264',
                },
                {
                  color: '#bf2202',
                  label: '264 - 267',
                },
                {
                  color: '#bc2002',
                  label: '267 - 270',
                },
                {
                  color: '#b91e02',
                  label: '270 - 273',
                },
                {
                  color: '#b61d02',
                  label: '273 - 276',
                },
                {
                  color: '#b31b01',
                  label: '276 - 279',
                },
                {
                  color: '#b01901',
                  label: '279 - 282',
                },
                {
                  color: '#ad1801',
                  label: '282 - 285',
                },
                {
                  color: '#aa1601',
                  label: '285 - 288',
                },
                {
                  color: '#a71401',
                  label: '288 - 291',
                },
                {
                  color: '#a41301',
                  label: '291 - 294',
                },
                {
                  color: '#a01201',
                  label: '294 - 297',
                },
                {
                  color: '#9d1001',
                  label: '297 - 300',
                },
                {
                  color: '#990f01',
                  label: '300 - 303',
                },
                {
                  color: '#960d01',
                  label: '303 - 306',
                },
                {
                  color: '#920c01',
                  label: '306 - 309',
                },
                {
                  color: '#8e0a01',
                  label: '309 - 312',
                },
                {
                  color: '#8a0902',
                  label: '312 - 315',
                },
                {
                  color: '#870802',
                  label: '315 - 318',
                },
                {
                  color: '#830702',
                  label: '318 - 321',
                },
                {
                  color: '#7c0503',
                  label: '321 - 324',
                },
                {
                  color: '#790403',
                  label: '324 - 327',
                },
                {
                  color: '#790403',
                  label: '327 - 330',
                },
                {
                  color: '#7a0403',
                  label: '&gt; 330',
                },
              ],
              layer_id: 'l42',
              license: null,
              location_query_url: null,
              metadata_url: null,
              monitor: 'EU-climate monitor',
              monitor_id: 'm9',
              polygon_query_url: null,
              position: 'right',
              range: [
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
              ],
              range_labels: [
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2000',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
              ],
              regex: 'tmean_ann_.*_3035',
              scale: 0.1,
              srv_path: 'eu_agg_ann_temperature_mean',
              theme: 'Climate & Health',
              title: 'European annual averages of mean temperature at 1 km resolution',
              unit: '°C x 10',
              usage_examples: 'Fusce eget quam et quam tincidunt faucibus.',
              use_case: 'Meteo-based agricultural insurance tool',
              value_society: 'Duis quis quam ut nulla viverra elementum et ut mi.',
              geo_story_id: 'g23',
            },
          ],
          metadata_url: null,
          monitors: [
            {
              id: 'm9',
              title: 'EU-climate monitor',
            },
            {
              id: 'm19',
              title: 'Global ML-based gridded meteo dataset',
            },
          ],
          notebooks_url: null,
          publications: [
            {
              title: null,
              url: null,
            },
          ],
          ready: true,
          theme: 'Climate & Health',
          title: 'Climate change (Europe)',
          use_case_link: [
            {
              title: null,
              url: 'https:dailymeteo.com',
              doi: ['https://doi.org/10.1000/demo_DOI'],
            },
          ],
        },
        {
          author: 'Aleksandar Sekuli? (asekulic@gilab.rs), Milan Kilibarda (mkilibarda@gilab.rs)',
          date_created: null,
          description:
            'Change in for max., min., mean temperature, sea-level pressure, and total precipitation at global scale can be analysed at 2 levels:\n1) Annual long-term means (LTM) maps are used to detect the changes between two periods\n2) Changes from year to year can be analysed from annual summaries.',
          geostory_bbox: null,
          geostory_center: null,
          geostory_zoom: null,
          id: 'g24',
          layers: null,
          metadata_url: null,
          monitors: [
            {
              id: 'm9',
              title: 'EU-climate monitor',
            },
            {
              id: 'm19',
              title: 'Global ML-based gridded meteo dataset',
            },
          ],
          notebooks_url: null,
          publications: [
            {
              title: null,
              url: null,
            },
          ],
          ready: false,
          theme: 'Climate & Health',
          title: 'Climate change (global)',
          use_case_link: [
            {
              title: null,
              url: 'https:dailymeteo.com',
              doi: ['https://doi.org/10.1000/demo_DOI'],
            },
          ],
        },
      ],
      id: 'm9',
      metadata_url: null,
      monitor_bbox: null,
      notebooks_url: null,
      publications: [
        {
          title: null,
          url: null,
        },
      ],
      ready: true,
      responsible_partner_name: 'GILAB',
      responsible_partner_url: 'https://gilab.rs',
      theme: 'Climate & Health',
      title: 'EU-climate monitor',
      use_case_link: [
        {
          title: 'Meteo support tool for wildfire risk',
          url: null,
          doi: ['https://doi.org/10.1000/demo_DOI'],
        },
      ],
      entity_type: 'monitor',
    },
  ],
};
