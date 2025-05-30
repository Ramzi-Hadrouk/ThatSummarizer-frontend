import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FeaturesSection } from "@/utils/interfaces/types";
import { FeatureItem } from "@/utils/interfaces/types";
import { Clock, ListCheck, Cloud } from 'lucide-react';


//---------icons:
const icons: { [key: string]: JSX.Element } = {
    CLOCK_ICON: <Clock />,
    CHECK_ICON: <ListCheck />,
    CLOUD_ICON: <Cloud />,
};

function getIcon(name: string) {
    return icons[name] || null;
}
//------------


//---------Component Function :
function FeatureSection({ data }: { data: FeaturesSection }) {
    return (
        <div className=" grid my-5  md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3  p-5 gap-5  justify-center  ">
            {data?.features?.map((feature: FeatureItem) => (
                <Card key={feature.id} className=" py-5 shadow-lg border  ">
                    <CardHeader>
                        <CardTitle className=" grid  grid-flow-col justify-start   ">

                            <span className=" mx-2 inline-block">{getIcon(feature.icon)}</span>
                            <span className=" mx-2 inline-block">{feature.heading.split(' ')[0]}</span>

                        </CardTitle>
                        <CardDescription>{feature.heading}</CardDescription>
                    </CardHeader>
                    <CardContent  className="pb-6 px-5">
                        <p >{feature.subheading}</p>
                    </CardContent>


                </Card>
            ))}




        </div>
    )
}

export default FeatureSection;
