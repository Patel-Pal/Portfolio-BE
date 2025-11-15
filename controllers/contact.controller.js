const Contact = require("../models/contact.model");
const sendEmail = require("../utils/sendEmail");

exports.submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save data in MongoDB
        const contact = await Contact.create({ name, email, message });

        // Email to YOU
        await sendEmail(
            process.env.MY_EMAIL,
            "New Contact Request",
            `
                <h2>New Contact Message</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
            `
        );

        // Email to USER
        await sendEmail(
            email,
            "Thank you for contacting me!",
            `
                <h3>Hello ${name},</h3>
                <p>Thank you for reaching out! I appreciate your message.</p>
                <p>I will get back to you as soon as possible.</p>
                <br/>
                <p>Best Regards,<br/>Pal Patel</p>
            `
        );

        return res.json({
            success: true,
            message: "Message sent successfully!",
            data: contact,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
