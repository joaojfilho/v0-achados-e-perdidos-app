export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export function getNewMatchEmail(
  userName: string,
  itemTitle: string,
  itemLink: string
): EmailTemplate {
  return {
    subject: `Possível correspondência encontrada: ${itemTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔍 Achados e Perdidos</h1>
            </div>
            <div class="content">
              <h2>Olá, ${userName}!</h2>
              <p>Temos uma ótima notícia! Um item que pode corresponder ao que você está procurando foi encontrado.</p>
              <p><strong>Item:</strong> ${itemTitle}</p>
              <p>Clique no botão abaixo para ver mais detalhes e entrar em contato:</p>
              <a href="${itemLink}" class="button">Ver Item Encontrado</a>
              <p>Se este não for o seu item, você pode ignorar este email.</p>
            </div>
            <div class="footer">
              <p>© 2025 Achados e Perdidos - Reunindo pessoas com seus pertences</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Olá, ${userName}!
      
      Temos uma ótima notícia! Um item que pode corresponder ao que você está procurando foi encontrado.
      
      Item: ${itemTitle}
      
      Acesse o link abaixo para ver mais detalhes:
      ${itemLink}
      
      Se este não for o seu item, você pode ignorar este email.
      
      © 2025 Achados e Perdidos
    `,
  };
}

export function getContactEmail(
  ownerName: string,
  senderName: string,
  itemTitle: string,
  message: string,
  itemLink: string
): EmailTemplate {
  return {
    subject: `Alguém entrou em contato sobre: ${itemTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nova Mensagem</h1>
            </div>
            <div class="content">
              <h2>Olá, ${ownerName}!</h2>
              <p><strong>${senderName}</strong> entrou em contato sobre seu item: <strong>${itemTitle}</strong></p>
              <div class="message-box">
                <p><strong>Mensagem:</strong></p>
                <p>${message}</p>
              </div>
              <a href="${itemLink}" class="button">Ver Item e Responder</a>
            </div>
            <div class="footer">
              <p>© 2025 Achados e Perdidos</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Olá, ${ownerName}!
      
      ${senderName} entrou em contato sobre seu item: ${itemTitle}
      
      Mensagem:
      ${message}
      
      Acesse o link abaixo para ver o item e responder:
      ${itemLink}
      
      © 2025 Achados e Perdidos
    `,
  };
}
