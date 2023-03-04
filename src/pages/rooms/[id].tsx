import { useRouter } from "next/router";
import * as d3 from "d3";
import React from "react";
import "./style.css";

const Room = () => {
  const ref = React.useRef(null);

  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    function handleZoom(e: { transform: string | number | boolean | readonly (string | number)[] | d3.ValueFn<d3.BaseType, unknown, string | number | boolean | readonly (string | number)[] | null> | null; }) {
      d3.select('svg g')
        .attr('transform', e.transform);
    }
    function initZoom() {
      d3.select('svg')
        .call(zoom);
    }
    let zoom: any = d3.zoom()
      .on('zoom', handleZoom);

    let projection = d3.geoMercator()
      .translate([200, 280])
      .center([0, 5]);

    let geoGenerator: any = d3.geoPath()
      .projection(projection);

    function update(geojson: any) {
      let data;
      if (!!geojson.features) {
        data = geojson.features
      } else {
        data = geojson.crs
      }

      let u = d3.select(ref.current)
        .append('svg')
        .attr('width', '65%')
        .attr('height', '101vh')
        // .attr('viewBox', '0 0 100 800')
        .append('g')
        .selectAll('path')
        .data(data);

      u.enter()
        .append('path')
        .attr('d', geoGenerator);
      initZoom();

    }


    // REQUEST DATA
    if (router.isReady) {
      d3.json(`${id === 'spain' ? 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-provinces.geojson' :
        id === 'africa' ? 'https://assets.codepen.io/2814973/africa.json' :
          id === 'france' ? 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson' :
            id === 'kazakhstan' ? 'http://localhost:3000/maps/kz.geojson' :
              id === 'italy' ? 'http://localhost:3000/maps/italy.json' :
                id === 'ukraine' ? 'http://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_UKR_1.json' :
                  'http://localhost:3000/maps/countries.geojson'
        }`)
        .then(function (json) {
          update(json);
        });
    }
  }, [router.isReady])

  return (
    <>
      <main ref={ref}></main>
    </>
  );
};

export default Room;
