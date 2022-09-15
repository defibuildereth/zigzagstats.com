import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Seo = ({ }) => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta
                        name="description"
                        content="Track new and active users per day, current and historic platform fees, total trading volume and ZZ token price history."
                    />;
                    <meta name="keywords" content="ZigZag Exchange Stats, ZZ Token Metrics, ZigZag Exchange User Information" />
                    <meta property="og:url" content="https://www.zigzagstats.com/" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="ZigZagStats.com - Key Metrics From ZigZag Exchange" />
                    <meta property="og:description" content="Track new and active users per day, current and historic platform fees, total trading volume and ZZ token price history." />
                    <meta property="og:image" content="https://www.zigzagstats.com/SD_ZigZagStats.com1.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content="https://www.zigzagstats.com/SD_ZigZagStats.com1.png" />
                    <meta
                        name="twitter:title"
                        content="ZigZagStats.com - Key Metrics From ZigZag Exchange"
                    />
                    <meta name="twitter:creator" content="@DefiBuilderETH" />
                    <meta name="twitter:site" content="@DefiBuilderETH" />
                    <meta
                        name="twitter:description"
                        content="Track new and active users per day, current and historic platform fees, total trading volume and ZZ token price history."
                    />
                </Helmet>
            </HelmetProvider>
        </>
    )
}

export default Seo;