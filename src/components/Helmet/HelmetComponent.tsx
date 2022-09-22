import React from "react"
import { Helmet } from "react-helmet"

interface IHelmet {
    title: string
    content: string
}

const HelmetComponent: React.FC<IHelmet> = ({ title, content }) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name={`${title}`} content={`${content}`} />
            </Helmet>
        </>
    )
}

export default HelmetComponent
