import { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import FooterLayout from "./FooterLayout";

const MainLayout = ({child}: { child: ReactNode}): JSX.Element => {
    return (
    <div className="d-flex flex-column min-vh-100">

        <div className="d-flex flex-column mb-auto bg-frame">
            <div className="d-flex flex-column bg-framed">
                {child}

                <FooterLayout />
            </div>
        </div>
        
    </div>

    )
}

export default MainLayout;