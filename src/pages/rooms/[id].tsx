"use client"
import { useRouter } from "next/router";
import * as d3 from "d3";
import React from "react";
import Link from "next/link";
import Image from 'next/image'
import { width } from "@mui/system";
import './style.css'
import { AuthContext, useAuthContext, UserData } from "@/services/contexts/auth/authContext";
import { getSession } from "next-auth/react";
import * as turf from '@turf/turf'

const Room = () => {
  const ref = React.useRef(null);
  const svg = d3.select(ref.current);
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = React.useState<UserData>(null)
  const [user, setUser] = React.useState({})
  const paths:any = []
  
  // Using the Fetch API to get GeoJSON data
async function fetchGeoJsonData(url: string): Promise<any> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch GeoJSON data. Status: ${response.status}`);
    }

    const geoJsonData = await response.json();
    return geoJsonData;
  } catch (error:any) {
    console.error(error.message);
    throw error;
  }
}

function findClosestRegions(selectedRegion:any, pathArray:any) {
  // Отримуємо центр обраного регіону
  const selectedBoundingBox = selectedRegion.getBBox();
  const selectedCenterX = selectedBoundingBox.x + selectedBoundingBox.width / 2;
  const selectedCenterY = selectedBoundingBox.y + selectedBoundingBox.height / 2;

  // Створюємо масив для зберігання найближчих регіонів
  const closestRegions:any = [];

  // Шукаємо найближчі регіони
  pathArray.forEach((region:any) => {
    if (region.element !== selectedRegion) {
      const regionBoundingBox = region.element.getBBox();
      const regionCenterX = regionBoundingBox.x + regionBoundingBox.width / 2;
      const regionCenterY = regionBoundingBox.y + regionBoundingBox.height / 2;

      // Розраховуємо відстань між центрами регіонів
      const distance = Math.sqrt(
        (selectedCenterX - regionCenterX) ** 2 +
        (selectedCenterY - regionCenterY) ** 2
      );

      // Додаємо регіон до масиву, якщо відстань мала, можна налаштувати потрібну відстань
      if (distance < 10) { // Наприклад, тут використовуємо відстань як поріг
        closestRegions.push(region.element);
        region.element.setAttribute('style', 'fill:red;')

        // setTimeout(() => {
        //   region.element.setAttribute('style', '')
        // }, 1000);
      }
    }
  });
  console.log(closestRegions)
  return closestRegions;
}


  // Функція, яку викликаємо при кліку на елемент path
  function pathClickHandler(event:any) {
    // Отримуємо посилання на елемент, який був натиснутий
    const clickedPath = event.target;
    console.log(clickedPath.getBBox())
    
    // Ваш код для обробки кліку на шлях (наприклад, ви можете вивести його id або виконати інші дії)
    console.log('Клікнуто на регіон з id:', clickedPath.getAttribute('id'));
    findClosestRegions(clickedPath, paths)
    
    // Example usage
    const geoJsonUrl = 'http://localhost:3000/maps/test.geojson';
    fetchGeoJsonData(geoJsonUrl)
      .then((data) => {
        // Handle the GeoJSON data
        // console.log('GeoJSON Data:', data);
        // for(let i = 0; i <= data.features.length; i++){
        //   console.log(data.features[i].geometry.coordinates)
        // }

        console.log('selected geo')
        console.log(data.features[clickedPath.getAttribute('id')].properties.NAME_1)
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });

    d3.select('g')
      .append('svg')
      .attr("x", clickedPath.getBBox().x + clickedPath.getBBox().width/2)
      .attr("y", clickedPath.getBBox().y + clickedPath.getBBox().height/2)
      .attr("height", 5)
      .attr("width", 5)
      .attr('transform', "rotate(45 50 50)")
      .attr('xlink:src', 'https://www.reshot.com/preview-assets/icons/UCA8NGYZDJ/right-arrow-UCA8NGYZDJ.svg')
  }

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

    svg.on('mouseover', ()=>{
      d3.select('g').on('mouseover', ()=>{
        const paths = document.querySelectorAll('svg path')
        paths.forEach((path) => {
          path.addEventListener('click', pathClickHandler);
        });
      })

    })


    // let isPainting = false;

    // svg.on("mousedown", () => {
    //   isPainting = true;
    // })
    // svg.on("mouseup", () => {
    //   isPainting = false;
    // })
    // svg.on('mousemove', (e) => {
    //   if (!isPainting) {
    //     return;
    //   }
    //   let g = d3.select('g')
    //   let xy = d3.pointer(event, g.node());

    //   g.append("circle")
    //     .attr('class', 'mainRoomCircle')
    //     .attr("r", 0.7)
    //     .attr("cx", xy[0])
    //     .attr("cy", xy[1])
    //     .attr("fill", "white");
    // })

    // REQUEST DATA
    if (router.isReady) {
      d3.json(`${!!id ? `http://localhost:3000/maps/${id}.geojson` :
        'http://localhost:3000/maps/countries.geojson'
        }`)
        .then(function (json) {
          update(json);
        })
        .then(function () {
          console.log('lol',document.querySelector('svg'))
          
          const svg = document.querySelector('svg>g');
          const pathes = svg?.querySelectorAll('path');


          pathes?.forEach((path, index) => {
            path.setAttribute('id', index.toString());
            const boundingBox = path.getBBox(); // Отримуємо обмежуючий прямокутник для кожного path
            const pathData = {
              id: index,
              element: path, // Зберігаємо сам елемент path
              x: boundingBox.x, // Координата x верхнього лівого кута
              y: boundingBox.y, // Координата y верхнього лівого кута
              width: boundingBox.width, // Ширина
              height: boundingBox.height // Висота
            };
          
            paths.push(pathData);

          });
        });
    }
  }, [router.isReady])
  React.useEffect(() => {
    //functions gets data of user session and sets to state
    (async function UserSession() {
      const session: any = await getSession();
      // UserSign(session)
      setUserData(session)
    })()

  }, [svg]);

  // (async function user() {
  //   const body: any = JSON.stringify(userData?.user);

  //   const res = await fetch('http://localhost:3000/api/auth/sign',
  //     {
  //       method: "POST",
  //       body
  //     })
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (json) {
  //       setUser(json)
  //       setUserData(json)
  //     })
  // })()

  if (!!userData) {
    // console.log(userData)
  }

  return (
    <>
      <AuthContext.Provider value={{ userData, setUserData }}>
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
      </AuthContext.Provider>
    </>
  );
};

export default Room;
