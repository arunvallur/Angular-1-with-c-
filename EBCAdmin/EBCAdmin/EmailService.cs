using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Net;
using System.Net.Mail;
using EBCAdmin.Models;
using System.Configuration;
using System.Web.UI;

/// <summary>
/// Summary description for EmailService
/// </summary>
public class EmailService
{

    public void SendMail(Member result)
    {
        try
        {

            string body = string.Empty;
            MailMessage mailMessage = new MailMessage();
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.UseDefaultCredentials = true;

            smtpClient.Host = ConfigurationSettings.AppSettings["SMTP"].ToString();
            smtpClient.Port = Convert.ToInt32(ConfigurationSettings.AppSettings["PORT"].ToString());
            smtpClient.EnableSsl = true;
       //     smtpClient.Credentials = new System.Net.NetworkCredential(ConfigurationSettings.AppSettings["USERNAME"].ToString(), ConfigurationSettings.AppSettings["PASSWORD"].ToString());
            mailMessage.To.Add(new MailAddress("arun.vallur09@gmail.com"));
            mailMessage.From = new MailAddress(ConfigurationSettings.AppSettings["From"].ToString());
            mailMessage.Subject = "EBC Booking Canclation";
            mailMessage.CC.Add(new MailAddress(ConfigurationSettings.AppSettings["CC"].ToString()));

            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/Template/Mail.html")))
            {
                body = reader.ReadToEnd();
            }


            mailMessage.Body = body;


            mailMessage.IsBodyHtml = true;
            //  SendEmail(mailMessage);

            smtpClient.Send(mailMessage);
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }
}