import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Input,
  Row,
  Select,
  theme,
} from "antd";
import { HOUR_MS } from "./constants";
import dayjs, { Dayjs } from "dayjs";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import copy from "copy-to-clipboard";
import { validate } from "./validate";
import { payloadToJson } from "./payloadToJson";
import { BoosterType, BotMessageRewardsPayload } from "./types";
import { getRewardTypes } from "./getRewardTypes";

function App() {
  const [payload, setPayload] = useState<BotMessageRewardsPayload>({
    payloadId: "",
    rewards: [],
  });
  const [payloadEdit, setPayloadEdit] = useState(payloadToJson(payload));

  const savePayload = (payload: BotMessageRewardsPayload) => {
    setPayload(payload);
    setPayloadEdit(payloadToJson(payload));
  };

  let errors: string[] | null;

  try {
    errors = validate(JSON.parse(payloadEdit));
  } catch (e) {
    errors = ["Invalid JSON"];
  }

  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <div style={{ padding: 20 }}>
        <h2>Payload Creator</h2>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>ID</label>
          </Col>
          <Col span={16}>
            <Input
              value={payload.payloadId}
              onChange={(e) => {
                savePayload({
                  ...payload,
                  payloadId: e.target.value,
                });
              }}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>Expiry Date</label>
          </Col>
          <Col span={16}>
            {/*<DatePicker*/}
            {/*  showTime*/}
            {/*  value={payload.expireAt ? dayjs(payload.expireAt) : null}*/}
            {/*  onChange={(value: Dayjs | null) => {*/}
            {/*    if (value) {*/}
            {/*      savePayload({*/}
            {/*        ...payload,*/}
            {/*        expireAt: value.toDate().getTime(),*/}
            {/*      });*/}
            {/*    } else {*/}
            {/*      const { expireAt, ...newPayload } = payload;*/}
            {/*      savePayload(newPayload);*/}
            {/*    }*/}
            {/*  }}*/}
            {/*  style={{ width: "100%" }}*/}
            {/*/>*/}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>Cooldown (hours)</label>
          </Col>
          <Col span={16}>
            <Input
              type="number"
              value={payload.cooldown ? payload.cooldown / HOUR_MS : ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);

                if (isNaN(value)) {
                  const { cooldown, ...newPayload } = payload;
                  savePayload(newPayload);
                } else {
                  savePayload({
                    ...payload,
                    cooldown: parseFloat(e.target.value) * HOUR_MS,
                  });
                }
              }}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <label>Rewards</label>
          </Col>
          <Col span={16}>
            {payload.rewards.map((reward, index) => {
              return (
                <Row key={index} gutter={[8, 8]}>
                  <Col span={11}>
                    <Select
                      value={reward.type}
                      options={getRewardTypes().map((type) => {
                        return { value: type };
                      })}
                      onChange={(type) => {
                        savePayload({
                          ...payload,
                          rewards: payload.rewards.map((reward, i) => {
                            return i === index
                              ? {
                                  ...reward,
                                  type,
                                }
                              : reward;
                          }),
                        });
                      }}
                      placeholder="Reward Type"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={11}>
                    <Input
                      type="number"
                      value={reward.amount}
                      onChange={(e) => {
                        savePayload({
                          ...payload,
                          rewards: payload.rewards.map((reward, i) => {
                            return i === index
                              ? {
                                  ...reward,
                                  amount: parseInt(e.target.value) || 0,
                                }
                              : reward;
                          }),
                        });
                      }}
                      placeholder="Amount"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      style={{ color: "red" }}
                      onClick={() => {
                        savePayload({
                          ...payload,
                          rewards: payload.rewards.filter((_, i) => {
                            return i !== index;
                          }),
                        });
                      }}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
              );
            })}
            <Button
              type="primary"
              onClick={() => {
                savePayload({
                  ...payload,
                  rewards: [
                    ...payload.rewards,
                    { type: BoosterType.Bomb, amount: 1 },
                  ],
                });
              }}
            >
              Add Reward
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={24}>
            Generated Payload:
            <TextArea
              rows={20}
              value={payloadEdit}
              onChange={(e) => {
                setPayloadEdit(e.target.value);

                try {
                  const payload = JSON.parse(e.target.value);

                  if (!validate(payload)) {
                    setPayload(payload);
                  }
                } catch {}
              }}
              style={{ marginTop: 10, border: errors ? `2px solid red` : "" }}
            />
            {errors?.map((error, i) => <div key={i}>{error}</div>)}
            <Button
              type="primary"
              onClick={() => {
                copy(payloadEdit);
              }}
              style={{ marginTop: 10 }}
              disabled={Boolean(errors)}
            >
              Copy
            </Button>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}

export default App;
