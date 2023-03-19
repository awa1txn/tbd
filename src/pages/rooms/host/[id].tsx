"use client";
import { useRouter } from "next/router";
import * as d3 from "d3";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import './style.css'

const Room = () => {
    const ref = React.useRef(null);
    const [placeMode, setPlaceMode] = useState('tk')
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
                .attr('class', 'hostRoomSvg')
                .attr('width', '100%')
                .attr('height', '95vh')
                .attr('viewBox', '0 0 400 600')
                .append('g')
                .selectAll('path')
                .data(data);

            u.enter()
                .append('path')
                .attr('class', 'hostRoomPath')
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
                                id === 'ukraine' ? 'http://localhost:3000/maps/ukr.geojson' :
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
    React.useEffect(() => {
        svg.on("mouseover", () => {

            let g = d3.select('g')
            placer(g, placeMode)
        })
        const placer = (el: any, mode: string) => {
            if (mode === 'unit') {
                el.on("click", () => {
                    let g = d3.select('g')
                    let xy = d3.pointer(event, el.node());

                    g.append("image")
                        .attr("x", xy[0] - 5)
                        .attr("y", xy[1] - 5)
                        .attr("height", 10)
                        .attr("width", 10)
                        .attr("xlink:href", 'https://cdn.discordapp.com/attachments/1071851153341546556/1073627957668622416/e1be0630c356653b.png');
                })
            }
            if (mode === 'tk') {
                el.on("click", () => {
                    let g = d3.select('g')
                    let xy = d3.pointer(event, el.node());

                    g.append("image")
                        .attr("x", xy[0] - 2.5)
                        .attr("y", xy[1] - 2.5)
                        .attr("height", 5)
                        .attr("width", 5)
                        .attr("xlink:href", 'https://cdn.discordapp.com/attachments/1071851153341546556/1073362358048665770/IMG_20230209_235820_235.png');
                })
            }
            if (mode === 'delete') {
                el.on("click", () => {
                    let imageSelected = d3.selectAll('svg>g>image:hover');
                    imageSelected.remove();
                })
            }
        }
    }, [placeMode])

    return (
        <>
            <Head>
                <title>{id}</title>
            </Head>
            <div className="hostRoomUpperPanel">
                <div className="hostRoomButton">
                    <span onClick={() => { setPlaceMode('unit') }} >Юніт</span>
                    <span onClick={() => { setPlaceMode('tk') }}>ТК</span>
                    <span onClick={() => { setPlaceMode('delete') }}>delete</span>
                    <span onClick={() => { console.log(placeMode) }}>log</span>
                </div>

            </div>
            <main className="hostRoomMain" ref={ref}>
            </main>

        </>
    );
};

export default Room;