"use client"
import { useRouter } from "next/router";
import * as d3 from "d3";
import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { width } from "@mui/system";
import './style.css'

const Room = () => {
  const ref = React.useRef(null);
  let svg = d3.select(ref.current);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    function handleZoom(e: { transform: string | number | boolean | readonly (string | number)[] | d3.ValueFn<d3.BaseType, unknown, string | number | boolean | readonly (string | number)[] | null> | null; }) {
      d3.select('svg g')
        .attr('transform', e.transform);
    }

    function initZoom() {
      d3.select('svg')
        .call(zoomed);
    }
    let zoomed: any = d3.zoom()
      .on('zoom', handleZoom);

    let projection = d3.geoMercator()
      .translate([200, 280])
      .center([10, 5]);

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
        .attr('class', 'mainRoomSvg')
        .attr('width', '100%')
        .attr('height', '95vh')
        // .attr('viewBox', '0 0 100 800')
        .append('g')
        .selectAll('path')
        .data(data);

      u.enter()
        .append('path')
        .attr('class', 'mainRoomPath')
        .attr('d', geoGenerator);
      initZoom();

    }

    let isPainting = false;

    svg.on("mousedown", () => {
      isPainting = true;
    })
    svg.on("mouseup", () => {
      isPainting = false;
    })
    svg.on('mousemove', (e) => {
      if (!isPainting) {
        return;
      }
      let g = d3.select('g')
      let xy = d3.pointer(event, g.node());

      g.append("circle")
        .attr('class', 'mainRoomCircle')
        .attr("r", 0.7)
        .attr("cx", xy[0])
        .attr("cy", xy[1])
        .attr("fill", "white");
    })

    const setCircle = (el: any) => {

      el.on(``, () => {
        let g = d3.select('g')
        let xy = d3.pointer(event, el.node());

        g.append("svg:defs").append("svg:marker")
          .attr("id", "triangle")
          .attr("refX", xy[0])
          .attr("refY", xy[1])
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M 0 -5 10 10")
          .style("stroke", "black");

        // g.append("circle")
        //   .attr('class', 'mainRoomCircle')
        //   .attr("r", 0.7)
        //   .attr("cx", xy[0])
        //   .attr("cy", xy[1])
        //   .attr("fill", "white");
      })
    }
    // REQUEST DATA
    if (router.isReady) {
      d3.json(`${id === 'spain' ? 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-provinces.geojson' :
        id === 'africa' ? 'https://assets.codepen.io/2814973/africa.json' :
          id === 'france' ? 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson' :
            id === 'kazakhstan' ? 'http://localhost:3000/maps/kz.geojson' :
              id === 'italy' ? 'http://localhost:3000/maps/italy.json' :
                id === 'ukraine' ? 'http://localhost:3000/maps/ukr.geojson' :
                  id === 'ruskazakukr' ? 'http://localhost:3000/maps/ruskazakukr.geojson' :
                    'http://localhost:3000/maps/countries.geojson'
        }`)
        .then(function (json) {
          update(json);
        })
        .then(function () {
          console.log(document.querySelector('svg'))
        });
    }
  }, [router.isReady])


  return (
    <>
      <div className="mainRoomUpperButton">
        <div className="mainRoomButton">Тестовий інтерфейс</div>
      </div>
      <main className="mainRoomMain" ref={ref}>
        <div className="mainRoomSidemenu">
          <div className="mainRoomParentGrid">
            <div className="mainRoomPlayerList">
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
              <Image src={"http://loremflickr.com/320/240"} width={200} height={160} alt="" />
            </div>
            <div className="mainRoomMenuGrid">
              <div>
                <div className="box-1">
                  <div className="mainRoomBtn mainRoomBtn-one">
                    <span>Армія</span>
                  </div>
                </div>
                <div className="box-1">
                  <div className="mainRoomBtn mainRoomBtn-one">
                    <span>Гроші</span>
                  </div>
                </div>
                <div className="box-1">
                  <div className="mainRoomBtn mainRoomBtn-one">
                    <span>Їжа</span>
                  </div>
                </div>
                <div className="box-1">
                  <div className="mainRoomBtn mainRoomBtn-one">
                    <span>Загальний чат</span>
                  </div>
                </div>
                <div className="box-1">
                  <a href="http://localhost:3000">
                    <div className="mainRoomBtn mainRoomBtn-one">
                      <span>На головну</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="whiteText">SHIFT+SCROLL щоб скролити горизонтально коли навелись на гравців</div>
            </div>
            <div className="mainRoomPlayerBar">
              <div className="mainRoomPlayerData">
                <Image className="mainRoomPlayerFlag" src="https://cdn.discordapp.com/attachments/1037018735392870460/1037782073840246794/800px-Flag_of_the_Peoples_Republic_of_China.svg_.jpg" width={200} height={200} style={{ width: '66.7%', height: '60%' }} quality='75' alt="" ></Image>
                <div className="mainRoomPlayerName">
                  П*здатийНікнейм2008
                </div>
              </div>
              <div>
                <Image src="https://loremflickr.com/320/240" width={200} height={200} style={{ width: '100%', height: '95%' }} quality='75' alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default Room;
