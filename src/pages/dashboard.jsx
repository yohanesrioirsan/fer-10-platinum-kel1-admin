import React from "react";
import { Container } from "react-bootstrap";
import DashboardContainer from "../containers/Dashboard/Index";

export default function DashboardPage() {
    return (
        <div>
            <Container>
                <DashboardContainer />
            </Container>
        </div>
    );
}
