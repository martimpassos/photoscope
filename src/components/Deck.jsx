import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Tile3DLayer } from '@deck.gl/geo-layers';
import { FirstPersonView } from '@deck.gl/core';
import { Box } from "@chakra-ui/react"


const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_TILES_KEY; // eslint-disable-line
const TILESET_URL = 'https://tile.googleapis.com/v1/3dtiles/root.json';

export default function Deck(props) {
    const [credits, setCredits] = useState('');

    const layers = [
        new Tile3DLayer({
            id: 'google-3d-tiles',
            data: TILESET_URL,
            onTilesetLoad: tileset3d => {
                tileset3d.options.onTraversalComplete = selectedTiles => {
                    const uniqueCredits = new Set();
                    selectedTiles.forEach(tile => {
                        const { copyright } = tile.content.gltf.asset;
                        copyright.split(';').forEach(uniqueCredits.add, uniqueCredits);
                    });
                    setCredits([...uniqueCredits].join('; '));
                    return selectedTiles;
                };
            },
            loadOptions: {
                fetch: { headers: { 'X-GOOG-API-KEY': GOOGLE_MAPS_API_KEY } }
            },
            operation: 'terrain+draw'
        }),
    ];

    return (
        <div>
            <DeckGL
                views={new FirstPersonView()}
                initialViewState={props.initialViewState}
                style={{ backgroundColor: '#061714' }}
                controller={true}
                layers={layers}
            />
            <Box
                pos='absolute'
                left='8'
                bottom='4'
                color='white'
                fontSize='10px'
            >
                {credits}
            </Box>
        </div>
    );
}