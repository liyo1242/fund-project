import { Button, Form, Input, Card } from 'antd'
import { useState } from 'react'
import useFundraising from '../hook/useFundraising'
import { useRouter } from 'next/router'

const FundraisingForm = () => {
  const { createFundraising } = useFundraising()
  const [limit, setLimit] = useState('')
  const router = useRouter()

  const handleAddFundraising = async () => {
    if (limit) {
      await createFundraising(+limit)
      router.push('/')
    }
  }

  const handleAddFundraisingFailed = () => {
    alert('failed to add contract')
  }

  return (
    <Card style={{ width: '50%', margin: 'auto' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleAddFundraising}
        onFinishFailed={handleAddFundraisingFailed}
        autoComplete="off"
      >
        <Form.Item
          label="limit"
          name="limit"
          rules={[{ required: true, message: 'Please input your minimum funding limit!' }]}
        >
          <Input value={limit} onChange={(event) => setLimit(event.target.value)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default FundraisingForm
