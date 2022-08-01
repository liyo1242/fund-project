import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import useFundraising from '../hook/useFundraising'
import { useRouter } from 'next/router'

const FundraisingRequestForm = () => {
  const { createFundraisingRequest } = useFundraising()
  const [description, setDescription] = useState('')
  const [costOfRequest, setCostOfRequest] = useState('')
  const [recipient, setRecipient] = useState('')
  const router = useRouter()

  const handleAddFundraisingRequest = async () => {
    const { address = '' } = router.query
    const func = createFundraisingRequest(address as string)
    await func(description, costOfRequest, recipient)
    router.push(`/fundraising/${address}/requests`)
  }

  const handleAddFundraisingFailed = () => {
    alert('failed to add contract')
  }

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleAddFundraisingRequest}
      onFinishFailed={handleAddFundraisingFailed}
      autoComplete="off"
    >
      <Form.Item
        label="description"
        name="description"
        rules={[{ required: true, message: 'Please input your funding request description!' }]}
      >
        <Input value={description} onChange={(event) => setDescription(event.target.value)} />
      </Form.Item>
      <Form.Item
        label="costOfRequest"
        name="costOfRequest"
        rules={[{ required: true, message: 'Please input your funding request costOfRequest!' }]}
      >
        <Input value={costOfRequest} onChange={(event) => setCostOfRequest(event.target.value)} />
      </Form.Item>
      <Form.Item
        label="recipient"
        name="recipient"
        rules={[{ required: true, message: 'Please input your funding request recipient!' }]}
      >
        <Input value={recipient} onChange={(event) => setRecipient(event.target.value)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FundraisingRequestForm
