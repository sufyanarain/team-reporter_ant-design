import React from 'react'
import { Button } from 'antd'
import { Row, Col } from 'antd';
import { AddQuestionModal } from './AddQuestionModal';
import ShowQuestions from './ShowQuestions';

export default function Settings() {
    return (
        <div>
            <Col span={20} offset={2}>
                <h3>Team Name : Saylani</h3>
                <hr />
            <AddQuestionModal />
            <ShowQuestions/>
            </Col>

        </div>
    )
}
