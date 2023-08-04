import { Label, Metadata } from "@samvera/nectar-iiif";
import { Box } from "@chakra-ui/react"

export default function ImageInfo(props) {
    const manifest = props.selectedManifest
    if (manifest) {
        return (
            <Box id='image-info' m={5} position='absolute' zIndex={1} color='white' >
                <Label label={manifest.label} as='h3' />
                <Metadata metadata={manifest.metadata} lang='pt-BR' />
            </Box>
        )
    } else {
        return <></>
    }
}
