import React from "react";
import '../styles/Home.css';
import {createCreationCategorySelectionEntry} from "../services/firebase-crud";

function Home() {

    return (
        <div>
            <div className="homeHeader">
                Wissensdatenbank zum Thema Nachhaltigkeit
            </div>
            <div>
                <p className="homeTextBody">
                    Dies ist die Wissensdatenbank der Teachers for Future. Hier finden sich engagierte Lehrer und Mitstreiter
                    zusammen, um all die vielen interessanten und nützlichen Materialien aus dem Internet zusammenzutragen,
                    gemeinsam zu evaluieren und somit eine übersichtliche Quelle für die vielen verschiedenen Aspekte des
                    Themas Nachhaltigkeit zu erschaffen.
                </p>
                <p className="homeTextBodyEnd">
                    Jeder ist willkommen, sich mit einzubringen! Stellt eure eigenen Lieblingsmaterialien hier ein, bewertet
                    die Materialien der anderen - Macht, worauf Ihr Lust habt, so dass mehr Menschen einen einfacheren Zugang
                    zu guten und getesteten Materialien haben.
                </p>
            </div>
        </div>
    );
}

export default Home;
