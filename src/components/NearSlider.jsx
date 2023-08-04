import {
    Box, Slider, SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark, 
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from "@chakra-ui/react"

export default function NearSlider(props) {
    return (
        <Box
            id='nearslider'
            position='absolute'
            top='30%'
            left='1%'
            bg='whiteAlpha.600'
            borderRadius='8px'
            zIndex='2'
            p='0.5%'
        >
            <Slider
                aria-label='near-value'
                onChange={(val) => props.setInitialViewState({ ...props.initialViewState, near: val})} // [0], far: val[1]
                defaultValue={0.1} // [0.1,9999]
                orientation='vertical'
                minH='20vh'
                m='2%'
                min={0.1}
                max={1500}
                step={5}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb index={0} />
                {/* <SliderThumb index={1} /> */}
            </Slider>
        </Box>
    )
}