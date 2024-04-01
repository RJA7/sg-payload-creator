import React, { useState } from "react";
import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import { RewardPayload, RewardType } from "./types";
import { HOUR_MS } from "./constants";
import dayjs, { Dayjs } from "dayjs";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import copy from "copy-to-clipboard";
import { validate } from "./validate";
import { payloadToJson } from "./payloadToJson";

function App() {
  const [payload, setPayload] = useState<RewardPayload>({
    id: "",
    rewards: [],
  });
  const [payloadEdit, setPayloadEdit] = useState(payloadToJson(payload));

  const savePayload = (payload: RewardPayload) => {
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
    <div style={{ padding: 20 }}>
      <h2>Payload Creator</h2>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>ID</label>
        </Col>
        <Col span={16}>
          <Input
            value={payload.id}
            onChange={(e) => {
              savePayload({
                ...payload,
                id: e.target.value,
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
          <DatePicker
            showTime
            value={payload.expireAt ? dayjs(payload.expireAt) : null}
            onChange={(value: Dayjs | null) => {
              if (value) {
                savePayload({
                  ...payload,
                  expireAt: value.toDate().getTime(),
                });
              } else {
                const { expireAt, ...newPayload } = payload;
                savePayload(newPayload);
              }
            }}
            style={{ width: "100%" }}
          />
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
                <Col span={7}>
                  <Select
                    value={reward.type}
                    options={Object.values(RewardType).map((type) => {
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
                <Col span={7}>
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
                <Col span={7}>
                  {reward.type === RewardType.Frame && (
                    <Input
                      value={reward.name}
                      onChange={(e) => {
                        savePayload({
                          ...payload,
                          rewards: payload.rewards.map((reward, i) => {
                            return i === index
                              ? {
                                  ...reward,
                                  name: e.target.value,
                                }
                              : reward;
                          }),
                        });
                      }}
                      placeholder="Frame name"
                      style={{ width: "100%" }}
                    />
                  )}
                </Col>
                <Col span={1} />
                <Col span={1}>
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
                  { type: RewardType.Bomb, amount: 1, name: "" },
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
  );
}

export default App;
