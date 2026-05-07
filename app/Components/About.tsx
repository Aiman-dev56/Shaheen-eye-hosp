"use client";

import Typography from "./UI/Typography";

export default function AboutUs() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 m-8">
                <div className="flex flex-col gap-4justify-center items-center">
                    <Typography variant="h2">Who We Are</Typography>
                    <Typography variant="p">We are a team of dedicated healthcare professionals committed to providing comprehensive and compassionate care to our patients. Our state-of-the-art facility is equipped with the latest medical technology, allowing us to deliver exceptional treatment and services tailored to the unique needs of each individual.</Typography>
                </div>
                <div>

                </div>


            </div>

        </>
    )
}