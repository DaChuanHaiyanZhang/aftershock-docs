# 建议

## 使用 FrontApp 做数据分析

也许我们后续还可以对用户在线聊天的信息进行数据分析，得出一些结论，方便做商业规划

<details>
<summary>查看AI建议指南</summary>

本文档整理了如何通过 **FrontApp API** 获取聊天记录以进行数据分析的方法。

### 1. FrontApp API 概览

FrontApp 提供两种主要 API：

- **REST API**: [https://dev.frontapp.com/reference](https://dev.frontapp.com/reference)  
- **GraphQL API**: [https://dev.frontapp.com/docs/graphql](https://dev.frontapp.com/docs/graphql)  

主要可访问的资源：

| 资源 | 描述 |
|------|------|
| `conversations` | 所有会话/线程（邮件、聊天、Facebook Messenger 等） |
| `messages` | 每个 conversation 中的消息 |
| `contacts` | 用户信息 |
| `users` | 团队成员信息 |
| `tags` / `folders` | 对话分类 |

> 理论上，可以通过这些资源获取所有聊天记录及用户信息。

---

### 2. 获取聊天记录步骤

#### 步骤一：获取对话列表

```http
GET /conversations
Authorization: Bearer <API_TOKEN>
```

- API 返回分页数据，需循环翻页（`page` / `per_page`）。
- 可使用 filter 筛选特定类型对话。

#### 步骤二：获取每个对话的消息

```http
GET /conversations/{conversation_id}/messages
Authorization: Bearer <API_TOKEN>
```

返回内容示例：

```json
[
  {
    "id": "msg_123",
    "body": "Hello, how can I help?",
    "from": "user_1",
    "to": ["user_2"],
    "created_at": "2025-11-27T08:00:00Z",
    "attachments": []
  }
]
```

#### 步骤三：获取用户信息

- `from` / `to` 对应 `contacts` 或 `users`。
- 可批量查询或缓存用户信息。

---

### 3. 注意事项

1. **API 速率限制**  
   - Front API 对每个 token 有调用限制，需要处理分页 + 延时请求。

2. **权限问题**  
   - 只能访问有权限的对话。  
   - 获取全量数据需管理员权限。

3. **数据量大**  
   - 大团队可能几十万条消息。  
   - 建议直接保存到数据库或 CSV，再分析。

4. **敏感数据**  
   - 消息可能包含用户隐私信息。分析前应考虑脱敏或合规处理。

---

### 4. Node.js 示例（REST API）

```js
const fetch = require('node-fetch');
const API_TOKEN = process.env.FRONT_API_TOKEN;

// 获取所有对话
async function getAllConversations() {
  let conversations = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`https://api2.frontapp.com/conversations?page=${page}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    const data = await res.json();
    conversations.push(...data._results);
    hasMore = data._pagination.next;
    page++;
  }

  return conversations;
}

// 获取单个对话消息
async function getMessages(conversationId) {
  const res = await fetch(`https://api2.frontapp.com/conversations/${conversationId}/messages`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return res.json();
}
```

---

### 5. 总结

- **可以通过 FrontApp API 下载聊天记录**，适合数据分析。  
- 需要满足以下条件：
  1. 拥有管理员权限
  2. 处理分页与速率限制
  3. 注意隐私与合规

- 推荐流程：
  1. 获取会话列表
  2. 获取每个会话消息
  3. 获取用户信息
  4. 保存数据到数据库/CSV
  5. 进行分析

---

**备注**：建议先做小规模测试，确保数据量可控，并验证权限和 API 限制。

</details>