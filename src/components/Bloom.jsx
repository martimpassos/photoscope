import BloomIIIF from "@samvera/bloom-iiif";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react"

export default function Bloom(props) {
    const collectionId = "https://imaginerio-images.s3.us-east-1.amazonaws.com/iiif/collection/smapshot.json";
    const [geojson, setGeoJSON] = useState(null);
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Fetched data succesfully")
            return (data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const myBreakpoints = {
        640: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 8,
            slidesPerGroup: 8,
            spaceBetween: 40,
        },
        1366: {
            slidesPerView: 9,
            slidesPerGroup: 9,
            spaceBetween: 50,
        },
        1920: {
            slidesPerView: 10,
            slidesPerGroup: 10,
            spaceBetween: 60,
        },
    };

    useEffect(() => {
        fetchData("https://raw.githubusercontent.com/imaginerio/imaginerio-data/main/output/import_viewcones.geojson")
            .then((geojsonData) => {
                setGeoJSON(geojsonData)
                //console.log(geojson.properties)
            });
    }, []);

    const handleInteraction = (item) => {
        const elements = item.id.split("/");
        const identifier = elements[elements.length - 2];
        const feature = geojson.features.find(feature => feature.properties.document_id === identifier).properties;
        props.setInitialViewState({
            ...props.initialViewState,
            latitude: Number(feature.latitude),
            longitude: Number(feature.longitude),
            position: [0, 0, Number(feature.altitude)],
            pitch: Number(feature.tilt) - 90, //- 90 if firstPersonView
            bearing: Number(feature.heading),
            fovy: Number(feature.fov) + 10,
            far: 99999,
            transitionDuration: 5000,
            // transitionInterpolator: new FlyToInterpolator()
        })
        fetchData(item.id)
            .then((manifest) => {
                props.setSelectedManifest(manifest)
            });
    }

    return (
        <Box
            id='bloom'
            pos='absolute'
            top={[null, '50vh', '66vh']}
            bottom='0'
            w='100vw'
            overflow='hidden'
        >
            <BloomIIIF

                collectionId={collectionId}
                onItemInteraction={handleInteraction}
                options={{
                    breakpoints: myBreakpoints,
                }}
            />
        </Box>
    )
}